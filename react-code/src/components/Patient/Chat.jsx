import React from "react";
import { ReactSession } from 'react-client-session';
import io from 'socket.io-client';
import axios from 'axios';
import $ from "jquery";

import "../../assets/css/style.css";
import config from "../../assets/config.json"

const css = `
    .main-w3 {
        margin-left:300px;margin-top:43px;

    }
    #reg{
        margin:0 -16px;
    }
    #reg-img{
        width:100%;
    }
    .wid-35{
        width:35px;
    }
    .wid25p{
        width:25%;
    }
    .wid50p{
        width:50%;
    }
    .wid-75p{
        width:75%;
    }
    header{
        padding-top:22px;
    }
    .white{
        color: white !important;
    }
    
    
`;

class Main extends React.Component {
    state = {
        users: [],
        chats: [],
        newchats: [],
        recipientName: '',
        recipientType: '',
        recipientId: 0,
        socket: io('http://localhost:5000', {
            withCredentials: true,
        })
      }
    
      constructor(props) {
        super(props);
      }

      componentDidMount() {

        this.state.socket.on("respond", (res) => {
            console.log('respo from server', res)
        });

        this.state.socket.on("receive-message", (res) => {
            console.log('--------------message received')
            console.log(res)
            
            if(this.state.recipientId == res.from && ReactSession.get("userId") == res.to)
            {
                this.open(this,this.state.recipientId,this.state.recipientName,'')
            }
            else if(ReactSession.get("userId") == res.to){
                if (window.confirm("Received new message from " + res.fromName + ", Want to open it?") == true) {
                    this.open(this,res.from, res.fromName,'')
                } else {
                  
                }
            }
        });

        this.state.socket.on('disconnect', function(name){
          console.log('Disconnect from server')
        });

        axios.post(config.server + `/chats`, JSON.stringify({ method: 'fetch-user-list', userType: ReactSession.get("userType"), userId: ReactSession.get("userId") }))
          .then(res => {
            const users = res.data.users;
            console.log(users)
    
            axios.post(config.server + `/chats`, JSON.stringify({ method: 'fetch-new-chat', userId: ReactSession.get("userId") }))
              .then(res => {
                const newChat = res.data.users;
    
                console.log('----')
                console.log(newChat)
                if (newChat && newChat.length > 0) {
                  users.forEach(function (u) {
                    var flag = true
                    newChat.forEach(function (n) {
                      if (u.userId == n.fromId) {
                        flag = false;
                        u.new = true;
                      }
                    })
                    if (flag) {
                      u.new = false;
                    }
                  })
                }
    
    
                this.setState({ users });
    
                var recipientName = users[0].name
                var recipientType = users[0].userType
                var recipientId = users[0].userId
    
                this.setState({ recipientName });
                this.setState({ recipientType });
                this.setState({ recipientId })
    
                this.chatList(recipientId)
    
    
                $("#contact" + recipientId).addClass("message-active");
    
              });
    
    
    
          })
    
      }

      open(e, id, name, type) {
        // e.preventDefault()
    
        var recipientName = name
        var recipientType = type
        var recipientId = id
    
        this.setState({ recipientName });
        this.setState({ recipientType });
        this.setState({ recipientId });
    
        // console.log(id)
        // console.log(name)
        // console.log(type)
    
        this.chatList(id)
        for (var i = 0; i < this.state.users.length; i++) {
          $("#contact" + this.state.users[i].userId).removeClass("message-active");
        }
        $("#contact" + recipientId).addClass("message-active");
    
    
    
      }
    
      chatList(id) {
    
        axios.post(config.server + `/chats`, JSON.stringify({ method: 'fetch-chat-list', userId: ReactSession.get("userId"), recipientId: id }))
          .then(res => {
            var chats = []
    
            console.log(res.data)
            if (res.data.status == 'error') {
    
              this.setState({ newchats: chats });
            }
            else {
              chats = res.data.chat
    
              this.setState({ newchats: chats });
            }
    
          })
    
        axios.post(config.server + `/chats`, JSON.stringify({ method: 'update-read', userId: ReactSession.get("userId"), recipientId: id }))
          .then(res => {
            console.log(res.data)
    
          })
      }
    
      send(e) {
        e.preventDefault()
        var message = $("#message").val()
    
        if (!message) {
          alert("Message cannot be empty");
        }
        else {
          axios.post(config.server + `/chats`, JSON.stringify({ method: 'add', fromId: ReactSession.get("userId"), toId: this.state.recipientId, message: message, fromUser: ReactSession.get("userName"), toUser: this.state.recipientName }))
            .then(res => {
              $("#message").val('')
              this.chatList(this.state.recipientId)
              this.state.socket.emit('message', {from: ReactSession.get("userId"), fromName: ReactSession.get("userName"), to: parseInt(this.state.recipientId), toName: this.state.recipientName, message:message});
            })
        }
      }
  render() {
    return (
        <main className="w3-light-grey">
            <div className="w3-main main-w3 ">
                <div class="container-chat">
                    <div class="row main-top-chat">
                    
                    
                        <section class="discussions ">
                        
                        <div class="contacts">
                        {
                            this.state.users
                                .map(user => (
                                <div class="discussion " id={"contact" + user.userId} onClick={(e) => this.open(e, user.userId, user.name, user.userType)}>
                                <div class="photo">
                                </div>
                                <div class="desc-contact">
                                    <p class="name">{user.name}</p>
                                    <p class="message">{user.userType}</p>
                                </div>
                                {
                                    user.new ?
                                    <div className="card-badge blue radius-pill">new</div>
                                    : null
                                }
                                </div>
                            ))
                        }
                    
                        </div>
                    </section>
                    
                    <section class="chat">
                        <div class="header-chat">
                        <i class="icon fa fa-user-o" aria-hidden="true"></i>
                        <p class="name">{this.state.recipientName ?? ""}</p>
                        
                        </div>
                        <div class="messages-chat">

                        {

                            this.state.newchats
                            .map(chat => {

                                if (chat.fromId == ReactSession.get("userId"))
                                return <div>
                                    <div className="message text-only">
                                        <div className="response">
                                            <p className="text"> {chat.message}</p>
                                        </div>
                                    </div>
                                    <p className="response-time time"> {chat.messageDate}</p>
                                </div>
                                else
                                return <div>
                                    <div className="message">
                                        <div className="photo" >
                                        </div>
                                        <p className="text"> {chat.message} </p>
                                    </div>
                                    <p className="time"> {chat.messageDate}</p>
                                </div>

                            })
                        }

                        </div>

                        <div class="footer-chat">
                            <input type="text" id="message" class="write-message" placeholder="Type your message here"></input>
                            <i class="icon send fa fa-paper-plane-o clickable" aria-hidden="true" onClick={(e) => this.send(e)}></i>
                        </div>

                    </section>
                    </div>
                </div>

            </div>
        </main>
    );
  }
}

export default Main;

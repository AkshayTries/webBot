const recognition  = new webkitSpeechRecognition();
recognition.continuous = false;  //only listens till first pause
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;
var xx;
var voice_response;

const utterThis = new SpeechSynthesisUtterance()
const synth = window.speechSynthesis







class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button'),
            voiceButton: document.querySelector('.voice_button')
        }
 
        this.state = false;
        this.messages = [];
    }

    
 
    display() {
        const {openButton, chatBox, sendButton,voiceButton} = this.args;
 
        openButton.addEventListener('click', () => this.toggleState(chatBox))
 
        sendButton.addEventListener('click', () => this.onSendButton(chatBox))
        voiceButton.addEventListener('click', () => {
        this.onVoiceButton(chatBox)
        });

        // recognition.onresult = (e) => {
        //     xx = e.results[0][0].transcript
        //     console.log(xx);
        //     if (xx === "") {
        //         return;
        //     }
     
        //     let msg1 = { name: "User", message: xx }
        //     this.messages.push(msg1);
     
        //     fetch('http://127.0.0.1:5000/predict', {
        //         method: 'POST',
        //         body: JSON.stringify({ message: xx }),
        //         mode: 'cors',
        //         headers: {
        //           'Content-Type': 'application/json'
        //         },
        //       })
        //       .then(r => r.json())
        //       .then(r => {
        //         let msg2 = { name: "Sam", message: r.answer };
        //         this.messages.push(msg2);
        //         this.updateChatText(chatbox)
        //         textField.value = ''
     
        //     }).catch((error) => {
        //         console.error('Error:', error);
        //         this.updateChatText(chatbox)
        //         textField.value = ''
        //       });
        // };
 
        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }
 
    toggleState(chatbox) {
        this.state = !this.state;
 
        // show or hides the box
        if(this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }
 
    // onVoiceButton(chatbox) 
    // {
    //     recognition.start();
    //     e = recognition.onresult()
    //     console.log(e)
    // }
    


    onVoiceButton(chatbox){
        recognition.start();
        recognition.onresult = (e) => {
            xx = e.results[0][0].transcript
            console.log(xx);
        }
        if (xx === "") {
            return;
        }
 
        let msg1 = { name: "User", message: xx }
        this.messages.push(msg1);
 
        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: JSON.stringify({ message: xx }),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(r => r.json())
          .then(r => {
            let msg2 = { name: "Sam", message: r.answer };
            this.messages.push(msg2);
            console.log(msg2.message);
            utterThis.text = msg2.message;
            synth.speak(utterThis)
            this.updateChatText(chatbox)
            textField.value = ''
 
        }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox)
            textField.value = ''
          });


        
    }
    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if (text1 === "") {
            return;
        }
 
        let msg1 = { name: "User", message: text1 }
        this.messages.push(msg1);
 
        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(r => r.json())
          .then(r => {
            let msg2 = { name: "Sam", message: r.answer };
            this.messages.push(msg2);
            this.updateChatText(chatbox)
            textField.value = ''
 
        }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox)
            textField.value = ''
          });
    }
 
    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item, index) {
            if (item.name === "Sam")
            {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
            }
            else
            {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
          });
 
        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}
 
const chatbox = new Chatbox();
chatbox.display();
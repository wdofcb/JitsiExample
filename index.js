
const startCall = document.getElementById("startCall")

startCall.addEventListener("click",function(){
    var userName = document.getElementById('username').value
    var email = document.getElementById('email').value

    console.log('from start')
    console.log(userName)
    console.log(email)
  
    document.getElementById('meeting').classList.remove('d-none')
    document.getElementById('controlls').classList.remove('d-none')

    const domain = 'online.parrot.house';
    const options = {
        roomName: 'Testing',
        width: "100%",
        height: 500,
        parentNode: document.querySelector('#meeting') ,
        interfaceConfigOverwrite: { TOOLBAR_TIMEOUT: 10}, 
        HIDE_INVITE_MORE_HEADER: true,
        configOverwrite: 
        { 
            startWithAudioMuted: true ,
            startWithVideoMuted : true
        } ,
        userInfo: {
            email: email,
            displayName: userName
        }
    }

    const api = new JitsiMeetExternalAPI(domain, options);

    const cameraBtn = document.getElementById("camera");
    const audioBtn = document.getElementById("audio");
    const currentDevices = document.getElementById("currentDevices");
    const info = document.getElementById("info")
    const chat = document.getElementById("chat")
    const share = document.getElementById("share")
    const end  = document.getElementById("end")
    const muteAll  = document.getElementById("muteAll")
    const startRecording  = document.getElementById("start")
    const stopRecording  = document.getElementById("stop")

    cameraBtn.addEventListener("click",function(){
        api.executeCommand('toggleVideo');
    })

    startRecording.addEventListener("click",function(){
        console.log("from start recording")
        api.executeCommand('startRecording', {
            mode: "file" ,//recording mode, either `file` or `stream`.
            dropboxToken: "", //dropbox oauth2 token.
            shouldShare: false, //whether the recording should be shared with the participants or not. Only applies to certain jitsi meet deploys.
            //rtmpStreamKey: string, //the RTMP stream key.
            //rtmpBroadcastID: string, //the RTMP broadcast ID.
            //youtubeStreamKey: string, //the youtube stream key.
            //youtubeBroadcastID: string //the youtube broacast ID.
        });
    })

    stopRecording.addEventListener("click",function(){
        api.executeCommand('stopRecording', {
            mode: "file" //recording mode to stop, `stream` or `file`
        }
        );
    })


    muteAll.addEventListener("click",function(){
        api.executeCommand('muteEveryone');
    })

    audioBtn.addEventListener("click",function(){
        api.executeCommand('toggleAudio');
    })

    currentDevices.addEventListener("click",function(){
        api.getCurrentDevices().then(devices  => {
            console.log(devices)
        });
    })

    info.addEventListener("click",function(){
        var details=  api.getParticipantsInfo();

        console.log("Participants Information : \n")
        console.log(details)

        var videoQuality= api.getVideoQuality();

        console.log("Video Quality settings : \n")
        console.log(videoQuality)
    })

    chat.addEventListener("click" , function(){
        api.executeCommand("toggleChat");
    })

    share.addEventListener("click" , function(){
        api.resizeLargeVideo(100, 100);
        api.executeCommand('toggleShareScreen');
    })

    end.addEventListener("click" , function(){
        api.executeCommand('hangup');
    })
})
    // api.addEventListener('participantRoleChanged', function(event) {

    //     console.log("ROLE : "+ event.role)

    

    //     if (event.role === "moderator") {

    //         console.log("from password ")

    //         api.executeCommand('password', 'password');

    //     }

    // });


    // api.on('passwordRequired', function ()

    // {

    //     console.log("from password required ")

    //   api.executeCommand('password', 'password');

    // });  

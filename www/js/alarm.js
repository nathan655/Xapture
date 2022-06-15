// This would be an extra functionality I would eventually work on but isn't fully made yet;

// window.wakeuptimer.wakeup( successCallback,
//     errorCallback,
//     // a list of alarms to set
//     {
//         alarms : [{
//             type : 'onetime',
//             time : { hour : 14, minute : 30 },
//             extra : { message : 'json containing app-specific information to be posted when alarm triggers' },
//             message : 'Alarm has expired!'
//         }]
//     }
// );
//
// // set repeating wakeup timer
// window.wakeuptimer.wakeup( successCallback,
//     errorCallback,
//     // a list of alarms to set
//     {
//         alarms : [{
//             type : 'repeating',
//             time : { minutes : 10 },
//             extra : { message : 'json containing app-specific information to be posted when alarm triggers' },
//             message : 'Alarm has expired!'
//         }]
//     }
// );
//
// // set timer, but skip launch if user is using the phone (screen is on)
// window.wakeuptimer.wakeup( successCallback,
//     errorCallback,
//     // a list of alarms to set
//     {
//         alarms : [{
//             type : 'onetime',
//             skipOnAwake: true,
//             time : { hour : 12, minute : 10 },
//             extra : { message : 'json containing app-specific information to be posted when alarm triggers' },
//             message : 'Alarm has expired!'
//         }]
//     }
// );
//
// // set wakeup timer, but skip launch if app is already running
// window.wakeuptimer.wakeup( successCallback,
//     errorCallback,
//     // a list of alarms to set
//     {
//         alarms : [{
//             type : 'onetime',
//             skipOnRunning: true,
//             time : { hour : 11, minute : 20 },
//             extra : { message : 'json containing app-specific information to be posted when alarm triggers' },
//             message : 'Alarm has expired!'
//         }]
//     }
// );
//
// // snooze...
// window.wakeuptimer.snooze( successCallback,
//     errorCallback,
//     {
//         alarms : [{
//             type : 'snooze',
//             time : { seconds : 60 }, // snooze for 60 seconds
//             extra : { }, // json containing app-specific information to be posted when alarm triggers
//             message : this.get('message'),
//             sound : this.get('sound'),
//             action : this.get('action')
//         }]
//     }
// );
//
// // example of a callback method
// var successCallback = function(result) {
//     if (result.type==='wakeup') {
//         console.log('wakeup alarm detected--' + result.extra);
//     } else if(result.type==='set'){
//         console.log('wakeup alarm set--' + result);
//     } else {
//         console.log('wakeup unhandled type (' + result.type + ')');
//     }
// };
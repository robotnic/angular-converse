MESSAGES=null;
CHAT=null;
angular.module('Chatbox', ['AngularXmpp','luegg.directives','angularMoment'])
//luegg.directives for scroll cha down

/*
Roster
*/

.directive('chatbox', function() {
    return {
        'restrict': 'E',
        'scope': {
            user:'=user',
            xmpp:'=xmpp',
            onclose:'&onclose'
        },
        'transclude': false,
        'templateUrl': 'directives/chatbox/chatbox.html',
        'controller': 'XmppUiMinichat',
        'link': function(scope, element, attrs,xmppController) {
            console.log("THIS IS THE CHAT",scope);
            scope.init(scope.xmpp);
                console.log("to changed",scope);
        }
    };
})





.controller('XmppUiMinichat', ['$scope', '$rootScope',  '$anchorScroll', 'Xmpp','MessageFactory',
    function($scope, $rootScope,  $anchorScroll, Xmpp, MessageFactory) {
//        CHAT=$scope;
        $scope.init=function(xmpp){
            var chat=new MessageFactory(xmpp);
            console.log(chat);
            $scope.chat=chat;
            console.log("totototot",$scope.user);
            $scope.to=$scope.user.jid.user+"@"+$scope.user.jid.domain;
            console.log("minichatcontroller",chat,$scope);
            $scope.username = xmpp.data.me.jid.user;
            $scope.chatwindows = [];
            $scope.messages = chat.messages;
            $scope.notifications = chat.notifications;
            //$scope.oninit({scope:$scope});

            //use broadcast to open chat window
//            $rootScope.$on("openchat", function(data, jid) {
/*
            $scope.openchat=function(jid){
                console.log("inside minichat",jid);
                if(typeof(jid)!=="string"){ 
                    jid=jid.jid.user+"@"+jid.jid.domain;
                }
                chat.markread(jid);
                console.log("chatjid",jid);
                $scope.me = xmpp.me;
                var fromname = jid.substring(0, jid.indexOf("@"));
                for (var i = 0; i < $scope.chatwindows.length; i++) {
                    if ($scope.chatwindows[i].jid == jid) {
                        $scope.chatwindows[i].style = "max";
                        return;  //---window already open
                    }
                }
                $scope.chatwindows.push({
                    jid: jid,
                    style: "max",
                    name: fromname
                });
            };
*/

            //big, small, close window
            $scope.makebig = function(user) {
                user.style = "max";
            };
            $scope.close = function() {
                $scope.onclose({jid:$scope.to});
            };
            $scope.minify = function(user) {
                user.style = "min";
            };
            $scope.time=function(timestamp){
                var date=new Date(timestamp);
                var h=date.getHours();
                if(h<10)h="0"+h;
                var m=date.getMinutes();
                if(m<10)m="0"+m;
                return h+":"+m
            }

            //send chat message 
            $scope.send = function(user, text ) {
                console.log(user, text);
                chat.send(user, text, event);
                chat.send({to:$scope.to,content:text.value});
                text.value="";
            };

        };
    }
]);

var SCOPE=null;  //debug only
angular.module("roster",['AngularXmpp','Chatbox','XmppMuc'])

.controller('pageController', ['$scope','Xmpp',function($scope,Xmpp){
        SCOPE=$scope;
        var host="http://localhost:3000";
        this.chatboxes=[ ];


        this.xmpp=new Xmpp(host);
        var that=this;  //better than $scope?
        this.xmpp.watch().then(function(data){
            console.log("end - should never be reached");
        },function(error){
            console.log(error);
        },function(notification){
            console.log("notification",notification);
            //$scope.$apply() not needed,empty function fires render process
        });

        this.login=function(jid,password){
            console.log("login",jid,password);
            this.xmpp.send('xmpp.login',{
                     "jid": jid,
                     "password": password,
                    "resource":"rosterexample"
            }).then(function(){
                that.xmpp.send("xmpp.roster.get")
                that.xmpp.send("xmpp.presence")
               
//                that.chatboxes.push({type:'muc',address:"eee@channels.buddycloud.com"});
                that.chatboxes.push({type:'muc',address:"seehaus@channels.buddycloud.com"});
            });
        }
//        this.login("bill@laos.buddycloud.com","bbb");  //debug
        this.openchat=function(item){
            this.chatboxes.push({type:'chat',address:item});
        }
        this.closechat=function(item){
            console.log("close chat",item);
            var index = this.chatboxes.indexOf(item);
            this.chatboxes.splice(index, 1);
        }

        this.status=function(status){
            console.log(status);
        }
        this.addContact=function(contact){
            console.log(contact);
        }

}])


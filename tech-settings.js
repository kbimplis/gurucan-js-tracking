

<script async="async" src="//cdn.wishpond.net/connect.js?merchantId=1504740&amp;writeKey=d94dc7a4fbca" type="text/javascript"></script>


<script>
var usermail, firstName, lastName, myname;

var apiUrl = 'https://nlp.gurucan.com/api/users/me';
fetch(apiUrl).then(response => {
    return response.json();
    }).then(data => {
         // Work with JSON data here
            usermail = data.me.email;
            myname = data.me.name;
            // Gurucan API returns a single string containing user first and last name, so we split it to separate them 
            firstName = myname.split(' ').slice(0, -1).join(' ');
            lastName = myname.split(' ').slice(-1).join(' ');

            // If no surname let Mautic use single entry as both lastname and firstname
            if(!firstName) firstName = lastName; 

            //alert(myname);
            //alert(usermail);
      }).catch(err => {
            // Do something for an error here
        });

    //(standard) Mautic Tracking script 
(function(w,d,t,u,n,a,m){w['MauticTrackingObject']=n;
w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments)},a=d.createElement(t),
m=d.getElementsByTagName(t)[0];a.async=1;a.src=u;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://mautic.bimplis.com/mtc.js','mt');


// Track Gurucan URL changes without need for page refresh 
lastUrl = location.href; 
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        onUrlChange();
    }
}).observe(document, {subtree: true, childList: true});
 
 
function onUrlChange() {
    // alert('URL changed!', location.href);
    // Fire Mautic page tracking 
    mt('send', 'pageview', {email: usermail, firstname: firstName, lastname: lastName});

   // Prepare attributes for Wishpond
     var attributes = {
        email: usermail,
        name: myname
    };

    Wishpond.Tracker.getAnonId().then(function(data) {

        Wishpond.Tracker.page();
        Wishpond.Tracker.identify(data, attributes);
    });

}
/**
 * e-ID app helper function
 */

var h = new String(location.hash).substring(1);
if ('' !== h) {
    var data = JSON.parse(decodeURIComponent(h));
    if (typeof data !== 'object') {
        data = {};
    }
    if ('error' in data) {
        alert(data.error);
    }
    localStorage.setItem('eid-data', JSON.stringify(data));
    window.close();
}

window.addEventListener('load', function() {
    var links = document.querySelectorAll('a[href="eid-app:"]');
    links.forEach(function (link) {
        var url = new String(location.href);
        url = 'eid-app:' + url.substring(location.protocol.length);
        console.debug(url);
        link.setAttribute('href', url);
    });
});

window.addEventListener('storage', function(event) {
    console.log(event);
    if ('eid-data' === event.key && null !== event.newValue) {
        var data = JSON.parse(event.newValue);
        if (typeof data !== 'object') {
            data = {};
        }
        document.getElementById('debug').innerText = JSON.stringify(data, null, '  ');
        localStorage.removeItem('eid-data');
    }
});

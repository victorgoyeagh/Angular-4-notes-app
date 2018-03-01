

export class Query {
    
    //url search
    static GetParameterByNameAlt(name) {
        let url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    static GetParameterByName(name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }

    static GetParameterByNameAsJson(a) {
        if (!a) return {};
        a = a.split('#')[0].split('&');
        var b = a.length, c = {}, d, k, v;
        while (b--) {
            d = a[b].split('=');
            k = d[0].replace('[]', ''), v = decodeURIComponent(d[1] || '');
            c[k] ? typeof c[k] === 'string' ? (c[k] = [v, c[k]]) : (c[k].unshift(v)) : c[k] = v;
        }
        return c
    }

    static GetParameterByNameAsJsonAlt() {
        var assoc = {};
        var decode = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); };
        var queryString = location.search.substring(1);
        var keyValues = queryString.split('&');

        for (var i in keyValues) {
            var key = keyValues[i].split('=');
            if (key.length > 1) {
                assoc[decode(key[0])] = decode(key[1]);
            }
        }

        return assoc;
    }

}
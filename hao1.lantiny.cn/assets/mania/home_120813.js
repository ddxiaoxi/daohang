(function() {
    var W = this, ab, F = W.jQuery, S = W.$, T = W.jQuery = W.$ = function(b, a) {
        return new T.fn.init(b,a)
    }
    , M = /^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/, ac = /^.[^:#\[\.,]*$/;
    T.fn = T.prototype = {
        init: function(e, b) {
            e = e || document;
            if (e.nodeType) {
                this[0] = e;
                this.length = 1;
                this.context = e;
                return this
            }
            if (typeof e === "string") {
                var c = M.exec(e);
                if (c && (c[1] || !b)) {
                    if (c[1]) {
                        e = T.clean([c[1]], b)
                    } else {
                        var a = document.getElementById(c[3]);
                        if (a && a.id != c[3]) {
                            return T().find(e)
                        }
                        var d = T(a || []);
                        d.context = document;
                        d.selector = e;
                        return d
                    }
                } else {
                    return T(b).find(e)
                }
            } else {
                if (T.isFunction(e)) {
                    return T(document).ready(e)
                }
            }
            if (e.selector && e.context) {
                this.selector = e.selector;
                this.context = e.context
            }
            return this.setArray(T.isArray(e) ? e : T.makeArray(e))
        },
        selector: "",
        jquery: "1.3.2",
        size: function() {
            return this.length
        },
        get: function(a) {
            return a === ab ? Array.prototype.slice.call(this) : this[a]
        },
        pushStack: function(c, a, d) {
            var b = T(c);
            b.prevObject = this;
            b.context = this.context;
            if (a === "find") {
                b.selector = this.selector + (this.selector ? " " : "") + d
            } else {
                if (a) {
                    b.selector = this.selector + "." + a + "(" + d + ")"
                }
            }
            return b
        },
        setArray: function(a) {
            this.length = 0;
            Array.prototype.push.apply(this, a);
            return this
        },
        each: function(a, b) {
            return T.each(this, a, b)
        },
        index: function(a) {
            return T.inArray(a && a.jquery ? a[0] : a, this)
        },
        attr: function(c, a, b) {
            var d = c;
            if (typeof c === "string") {
                if (a === ab) {
                    return this[0] && T[b || "attr"](this[0], c)
                } else {
                    d = {};
                    d[c] = a
                }
            }
            return this.each(function(e) {
                for (c in d) {
                    T.attr(b ? this.style : this, c, T.prop(this, d[c], b, e, c))
                }
            })
        },
        css: function(b, a) {
            if ((b == "width" || b == "height") && parseFloat(a) < 0) {
                a = ab
            }
            return this.attr(b, a, "curCSS")
        },
        text: function(a) {
            if (typeof a !== "object" && a != null) {
                return this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(a))
            }
            var b = "";
            T.each(a || this, function() {
                T.each(this.childNodes, function() {
                    if (this.nodeType != 8) {
                        b += this.nodeType != 1 ? this.nodeValue : T.fn.text([this])
                    }
                })
            });
            return b
        },
        wrapAll: function(b) {
            if (this[0]) {
                var a = T(b, this[0].ownerDocument).clone();
                if (this[0].parentNode) {
                    a.insertBefore(this[0])
                }
                a.map(function() {
                    var c = this;
                    while (c.firstChild) {
                        c = c.firstChild
                    }
                    return c
                }).append(this)
            }
            return this
        },
        wrapInner: function(a) {
            return this.each(function() {
                T(this).contents().wrapAll(a)
            })
        },
        wrap: function(a) {
            return this.each(function() {
                T(this).wrapAll(a)
            })
        },
        append: function() {
            return this.domManip(arguments, true, function(a) {
                if (this.nodeType == 1) {
                    this.appendChild(a)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, true, function(a) {
                if (this.nodeType == 1) {
                    this.insertBefore(a, this.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, false, function(a) {
                this.parentNode.insertBefore(a, this)
            })
        },
        after: function() {
            return this.domManip(arguments, false, function(a) {
                this.parentNode.insertBefore(a, this.nextSibling)
            })
        },
        end: function() {
            return this.prevObject || T([])
        },
        push: [].push,
        sort: [].sort,
        splice: [].splice,
        find: function(b) {
            if (this.length === 1) {
                var a = this.pushStack([], "find", b);
                a.length = 0;
                T.find(b, this[0], a);
                return a
            } else {
                return this.pushStack(T.unique(T.map(this, function(c) {
                    return T.find(b, c)
                })), "find", b)
            }
        },
        clone: function(b) {
            var d = this.map(function() {
                if (!T.support.noCloneEvent && !T.isXMLDoc(this)) {
                    var f = this.outerHTML;
                    if (!f) {
                        var e = this.ownerDocument.createElement("div");
                        e.appendChild(this.cloneNode(true));
                        f = e.innerHTML
                    }
                    return T.clean([f.replace(/ jQuery\d+="(?:\d+|null)"/g, "").replace(/^\s*/, "")])[0]
                } else {
                    return this.cloneNode(true)
                }
            });
            if (b === true) {
                var a = this.find("*").andSelf()
                  , c = 0;
                d.find("*").andSelf().each(function() {
                    if (this.nodeName !== a[c].nodeName) {
                        return
                    }
                    var g = T.data(a[c], "events");
                    for (var e in g) {
                        for (var f in g[e]) {
                            T.event.add(this, e, g[e][f], g[e][f].data)
                        }
                    }
                    c++
                })
            }
            return d
        },
        filter: function(a) {
            return this.pushStack(T.isFunction(a) && T.grep(this, function(b, c) {
                return a.call(b, c)
            }) || T.multiFilter(a, T.grep(this, function(b) {
                return b.nodeType === 1
            })), "filter", a)
        },
        closest: function(c) {
            var a = T.expr.match.POS.test(c) ? T(c) : null
              , b = 0;
            return this.map(function() {
                var d = this;
                while (d && d.ownerDocument) {
                    if (a ? a.index(d) > -1 : T(d).is(c)) {
                        T.data(d, "closest", b);
                        return d
                    }
                    d = d.parentNode;
                    b++
                }
            })
        },
        not: function(b) {
            if (typeof b === "string") {
                if (ac.test(b)) {
                    return this.pushStack(T.multiFilter(b, this, true), "not", b)
                } else {
                    b = T.multiFilter(b, this)
                }
            }
            var a = b.length && b[b.length - 1] !== ab && !b.nodeType;
            return this.filter(function() {
                return a ? T.inArray(this, b) < 0 : this != b
            })
        },
        add: function(a) {
            return this.pushStack(T.unique(T.merge(this.get(), typeof a === "string" ? T(a) : T.makeArray(a))))
        },
        is: function(a) {
            return !!a && T.multiFilter(a, this).length > 0
        },
        hasClass: function(a) {
            return !!a && this.is("." + a)
        },
        val: function(c) {
            if (c === ab) {
                var j = this[0];
                if (j) {
                    if (T.nodeName(j, "option")) {
                        return (j.attributes.value || {}).specified ? j.value : j.text
                    }
                    if (T.nodeName(j, "select")) {
                        var e = j.selectedIndex
                          , b = []
                          , a = j.options
                          , f = j.type == "select-one";
                        if (e < 0) {
                            return null
                        }
                        for (var i = f ? e : 0, d = f ? e + 1 : a.length; i < d; i++) {
                            var g = a[i];
                            if (g.selected) {
                                c = T(g).val();
                                if (f) {
                                    return c
                                }
                                b.push(c)
                            }
                        }
                        return b
                    }
                    return (j.value || "").replace(/\r/g, "")
                }
                return ab
            }
            if (typeof c === "number") {
                c += ""
            }
            return this.each(function() {
                if (this.nodeType != 1) {
                    return
                }
                if (T.isArray(c) && /radio|checkbox/.test(this.type)) {
                    this.checked = (T.inArray(this.value, c) >= 0 || T.inArray(this.name, c) >= 0)
                } else {
                    if (T.nodeName(this, "select")) {
                        var k = T.makeArray(c);
                        T("option", this).each(function() {
                            this.selected = (T.inArray(this.value, k) >= 0 || T.inArray(this.text, k) >= 0)
                        });
                        if (!k.length) {
                            this.selectedIndex = -1
                        }
                    } else {
                        this.value = c
                    }
                }
            })
        },
        html: function(a) {
            return a === ab ? (this[0] ? this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g, "") : null) : this.empty().append(a)
        },
        replaceWith: function(a) {
            return this.after(a).remove()
        },
        eq: function(a) {
            return this.slice(a, +a + 1)
        },
        slice: function() {
            return this.pushStack(Array.prototype.slice.apply(this, arguments), "slice", Array.prototype.slice.call(arguments).join(","))
        },
        map: function(a) {
            return this.pushStack(T.map(this, function(b, c) {
                return a.call(b, c, b)
            }))
        },
        andSelf: function() {
            return this.add(this.prevObject)
        },
        domManip: function(d, a, b) {
            if (this[0]) {
                var e = (this[0].ownerDocument || this[0]).createDocumentFragment()
                  , i = T.clean(d, (this[0].ownerDocument || this[0]), e)
                  , f = e.firstChild;
                if (f) {
                    for (var g = 0, j = this.length; g < j; g++) {
                        b.call(c(this[g], f), this.length > 1 || g > 0 ? e.cloneNode(true) : e)
                    }
                }
                if (i) {
                    T.each(i, E)
                }
            }
            return this;
            function c(l, k) {
                return a && T.nodeName(l, "table") && T.nodeName(k, "tr") ? (l.getElementsByTagName("tbody")[0] || l.appendChild(l.ownerDocument.createElement("tbody"))) : l
            }
        }
    };
    T.fn.init.prototype = T.fn;
    function E(b, a) {
        if (a.src) {
            T.ajax({
                url: a.src,
                async: false,
                dataType: "script"
            })
        } else {
            T.globalEval(a.text || a.textContent || a.innerHTML || "")
        }
        if (a.parentNode) {
            a.parentNode.removeChild(a)
        }
    }
    function ad() {
        return +new Date
    }
    T.extend = T.fn.extend = function() {
        var c = arguments[0] || {}, e = 1, d = arguments.length, i = false, f;
        if (typeof c === "boolean") {
            i = c;
            c = arguments[1] || {};
            e = 2
        }
        if (typeof c !== "object" && !T.isFunction(c)) {
            c = {}
        }
        if (d == e) {
            c = this;
            --e
        }
        for (; e < d; e++) {
            if ((f = arguments[e]) != null) {
                for (var g in f) {
                    var b = c[g]
                      , a = f[g];
                    if (c === a) {
                        continue
                    }
                    if (i && a && typeof a === "object" && !a.nodeType) {
                        c[g] = T.extend(i, b || (a.length != null ? [] : {}), a)
                    } else {
                        if (a !== ab) {
                            c[g] = a
                        }
                    }
                }
            }
        }
        return c
    }
    ;
    var ag = /z-?index|font-?weight|opacity|zoom|line-?height/i
      , Q = document.defaultView || {}
      , L = Object.prototype.toString;
    T.extend({
        noConflict: function(a) {
            W.$ = S;
            if (a) {
                W.jQuery = F
            }
            return T
        },
        isFunction: function(a) {
            return L.call(a) === "[object Function]"
        },
        isArray: function(a) {
            return L.call(a) === "[object Array]"
        },
        isXMLDoc: function(a) {
            return a.nodeType === 9 && a.documentElement.nodeName !== "HTML" || !!a.ownerDocument && T.isXMLDoc(a.ownerDocument)
        },
        globalEval: function(a) {
            if (a && /\S/.test(a)) {
                var b = document.getElementsByTagName("head")[0] || document.documentElement
                  , c = document.createElement("script");
                c.type = "text/javascript";
                if (T.support.scriptEval) {
                    c.appendChild(document.createTextNode(a))
                } else {
                    c.text = a
                }
                b.insertBefore(c, b.firstChild);
                b.removeChild(c)
            }
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toUpperCase() == b.toUpperCase()
        },
        each: function(e, a, f) {
            var g, d = 0, c = e.length;
            if (f) {
                if (c === ab) {
                    for (g in e) {
                        if (a.apply(e[g], f) === false) {
                            break
                        }
                    }
                } else {
                    for (; d < c; ) {
                        if (a.apply(e[d++], f) === false) {
                            break
                        }
                    }
                }
            } else {
                if (c === ab) {
                    for (g in e) {
                        if (a.call(e[g], g, e[g]) === false) {
                            break
                        }
                    }
                } else {
                    for (var b = e[0]; d < c && a.call(b, d, b) !== false; b = e[++d]) {}
                }
            }
            return e
        },
        prop: function(b, a, c, d, e) {
            if (T.isFunction(a)) {
                a = a.call(b, d)
            }
            return typeof a === "number" && c == "curCSS" && !ag.test(e) ? a + "px" : a
        },
        className: {
            add: function(b, a) {
                T.each((a || "").split(/\s+/), function(d, c) {
                    if (b.nodeType == 1 && !T.className.has(b.className, c)) {
                        b.className += (b.className ? " " : "") + c
                    }
                })
            },
            remove: function(b, a) {
                if (b.nodeType == 1) {
                    b.className = a !== ab ? T.grep(b.className.split(/\s+/), function(c) {
                        return !T.className.has(a, c)
                    }).join(" ") : ""
                }
            },
            has: function(a, b) {
                return a && T.inArray(b, (a.className || a).toString().split(/\s+/)) > -1
            }
        },
        swap: function(b, c, a) {
            var e = {};
            for (var d in c) {
                e[d] = b.style[d];
                b.style[d] = c[d]
            }
            a.call(b);
            for (var d in c) {
                b.style[d] = e[d]
            }
        },
        css: function(e, g, c, i) {
            if (g == "width" || g == "height") {
                var a, f = {
                    position: "absolute",
                    visibility: "hidden",
                    display: "block"
                }, b = g == "width" ? ["Left", "Right"] : ["Top", "Bottom"];
                function d() {
                    a = g == "width" ? e.offsetWidth : e.offsetHeight;
                    if (i === "border") {
                        return
                    }
                    T.each(b, function() {
                        if (!i) {
                            a -= parseFloat(T.curCSS(e, "padding" + this, true)) || 0
                        }
                        if (i === "margin") {
                            a += parseFloat(T.curCSS(e, "margin" + this, true)) || 0
                        } else {
                            a -= parseFloat(T.curCSS(e, "border" + this + "Width", true)) || 0
                        }
                    })
                }
                if (e.offsetWidth !== 0) {
                    d()
                } else {
                    T.swap(e, f, d)
                }
                return Math.max(0, Math.round(a))
            }
            return T.curCSS(e, g, c)
        },
        curCSS: function(e, i, g) {
            var b, j = e.style;
            if (i == "opacity" && !T.support.opacity) {
                b = T.attr(j, "opacity");
                return b == "" ? "1" : b
            }
            if (i.match(/float/i)) {
                i = H
            }
            if (!g && j && j[i]) {
                b = j[i]
            } else {
                if (Q.getComputedStyle) {
                    if (i.match(/float/i)) {
                        i = "float"
                    }
                    i = i.replace(/([A-Z])/g, "-$1").toLowerCase();
                    var a = Q.getComputedStyle(e, null);
                    if (a) {
                        b = a.getPropertyValue(i)
                    }
                    if (i == "opacity" && b == "") {
                        b = "1"
                    }
                } else {
                    if (e.currentStyle) {
                        var d = i.replace(/\-(\w)/g, function(l, k) {
                            return k.toUpperCase()
                        });
                        b = e.currentStyle[i] || e.currentStyle[d];
                        if (!/^\d+(px)?$/i.test(b) && /^\d/.test(b)) {
                            var f = j.left
                              , c = e.runtimeStyle.left;
                            e.runtimeStyle.left = e.currentStyle.left;
                            j.left = b || 0;
                            b = j.pixelLeft + "px";
                            j.left = f;
                            e.runtimeStyle.left = c
                        }
                    }
                }
            }
            return b
        },
        clean: function(g, b, d) {
            b = b || document;
            if (typeof b.createElement === "undefined") {
                b = b.ownerDocument || b[0] && b[0].ownerDocument || document
            }
            if (!d && g.length === 1 && typeof g[0] === "string") {
                var e = /^<(\w+)\s*\/?>$/.exec(g[0]);
                if (e) {
                    return [b.createElement(e[1])]
                }
            }
            var f = []
              , i = []
              , a = b.createElement("div");
            T.each(g, function(n, j) {
                if (typeof j === "number") {
                    j += ""
                }
                if (!j) {
                    return
                }
                if (typeof j === "string") {
                    j = j.replace(/(<(\w+)[^>]*?)\/>/g, function(t, r, u) {
                        return u.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i) ? t : r + "></" + u + ">"
                    });
                    var o = j.replace(/^\s+/, "").substring(0, 10).toLowerCase();
                    var l = !o.indexOf("<opt") && [1, "<select multiple='multiple'>", "</select>"] || !o.indexOf("<leg") && [1, "<fieldset>", "</fieldset>"] || o.match(/^<(thead|tbody|tfoot|colg|cap)/) && [1, "<table>", "</table>"] || !o.indexOf("<tr") && [2, "<table><tbody>", "</tbody></table>"] || (!o.indexOf("<td") || !o.indexOf("<th")) && [3, "<table><tbody><tr>", "</tr></tbody></table>"] || !o.indexOf("<col") && [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"] || !T.support.htmlSerialize && [1, "div<div>", "</div>"] || [0, "", ""];
                    a.innerHTML = l[1] + j + l[2];
                    while (l[0]--) {
                        a = a.lastChild
                    }
                    if (!T.support.tbody) {
                        var k = /<tbody/i.test(j)
                          , p = !o.indexOf("<table") && !k ? a.firstChild && a.firstChild.childNodes : l[1] == "<table>" && !k ? a.childNodes : [];
                        for (var q = p.length - 1; q >= 0; --q) {
                            if (T.nodeName(p[q], "tbody") && !p[q].childNodes.length) {
                                p[q].parentNode.removeChild(p[q])
                            }
                        }
                    }
                    if (!T.support.leadingWhitespace && /^\s/.test(j)) {
                        a.insertBefore(b.createTextNode(j.match(/^\s*/)[0]), a.firstChild)
                    }
                    j = T.makeArray(a.childNodes)
                }
                if (j.nodeType) {
                    f.push(j)
                } else {
                    f = T.merge(f, j)
                }
            });
            if (d) {
                for (var c = 0; f[c]; c++) {
                    if (T.nodeName(f[c], "script") && (!f[c].type || f[c].type.toLowerCase() === "text/javascript")) {
                        i.push(f[c].parentNode ? f[c].parentNode.removeChild(f[c]) : f[c])
                    } else {
                        if (f[c].nodeType === 1) {
                            f.splice.apply(f, [c + 1, 0].concat(T.makeArray(f[c].getElementsByTagName("script"))))
                        }
                        d.appendChild(f[c])
                    }
                }
                return i
            }
            return f
        },
        attr: function(c, f, b) {
            if (!c || c.nodeType == 3 || c.nodeType == 8) {
                return ab
            }
            var e = !T.isXMLDoc(c)
              , a = b !== ab;
            f = e && T.props[f] || f;
            if (c.tagName) {
                var g = /href|src|style/.test(f);
                if (f == "selected" && c.parentNode) {
                    c.parentNode.selectedIndex
                }
                if (f in c && e && !g) {
                    if (a) {
                        if (f == "type" && T.nodeName(c, "input") && c.parentNode) {
                            throw "type property can't be changed"
                        }
                        c[f] = b
                    }
                    if (T.nodeName(c, "form") && c.getAttributeNode(f)) {
                        return c.getAttributeNode(f).nodeValue
                    }
                    if (f == "tabIndex") {
                        var d = c.getAttributeNode("tabIndex");
                        return d && d.specified ? d.value : c.nodeName.match(/(button|input|object|select|textarea)/i) ? 0 : c.nodeName.match(/^(a|area)$/i) && c.href ? 0 : ab
                    }
                    return c[f]
                }
                if (!T.support.style && e && f == "style") {
                    return T.attr(c.style, "cssText", b)
                }
                if (a) {
                    c.setAttribute(f, "" + b)
                }
                var i = !T.support.hrefNormalized && e && g ? c.getAttribute(f, 2) : c.getAttribute(f);
                return i === null ? ab : i
            }
            if (!T.support.opacity && f == "opacity") {
                if (a) {
                    c.zoom = 1;
                    c.filter = (c.filter || "").replace(/alpha\([^)]*\)/, "") + (parseInt(b) + "" == "NaN" ? "" : "alpha(opacity=" + b * 100 + ")")
                }
                return c.filter && c.filter.indexOf("opacity=") >= 0 ? (parseFloat(c.filter.match(/opacity=([^)]*)/)[1]) / 100) + "" : ""
            }
            f = f.replace(/-([a-z])/ig, function(k, j) {
                return j.toUpperCase()
            });
            if (a) {
                c[f] = b
            }
            return c[f]
        },
        trim: function(a) {
            return (a || "").replace(/^\s+|\s+$/g, "")
        },
        makeArray: function(a) {
            var c = [];
            if (a != null) {
                var b = a.length;
                if (b == null || typeof a === "string" || T.isFunction(a) || a.setInterval) {
                    c[0] = a
                } else {
                    while (b) {
                        c[--b] = a[b]
                    }
                }
            }
            return c
        },
        inArray: function(b, a) {
            for (var d = 0, c = a.length; d < c; d++) {
                if (a[d] === b) {
                    return d
                }
            }
            return -1
        },
        merge: function(b, e) {
            var d = 0, c, a = b.length;
            if (!T.support.getAll) {
                while ((c = e[d++]) != null) {
                    if (c.nodeType != 8) {
                        b[a++] = c
                    }
                }
            } else {
                while ((c = e[d++]) != null) {
                    b[a++] = c
                }
            }
            return b
        },
        unique: function(a) {
            var f = []
              , g = {};
            try {
                for (var e = 0, d = a.length; e < d; e++) {
                    var b = T.data(a[e]);
                    if (!g[b]) {
                        g[b] = true;
                        f.push(a[e])
                    }
                }
            } catch (c) {
                f = a
            }
            return f
        },
        grep: function(e, a, f) {
            var d = [];
            for (var c = 0, b = e.length; c < b; c++) {
                if (!f != !a(e[c], c)) {
                    d.push(e[c])
                }
            }
            return d
        },
        map: function(f, a) {
            var e = [];
            for (var d = 0, c = f.length; d < c; d++) {
                var b = a(f[d], d);
                if (b != null) {
                    e[e.length] = b
                }
            }
            return e.concat.apply([], e)
        }
    });
    var O = navigator.userAgent.toLowerCase();
    T.browser = {
        version: (O.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, "0"])[1],
        safari: /webkit/.test(O),
        opera: /opera/.test(O),
        msie: /msie/.test(O) && !/opera/.test(O),
        mozilla: /mozilla/.test(O) && !/(compatible|webkit)/.test(O)
    };
    T.each({
        parent: function(a) {
            return a.parentNode
        },
        parents: function(a) {
            return T.dir(a, "parentNode")
        },
        next: function(a) {
            return T.nth(a, 2, "nextSibling")
        },
        prev: function(a) {
            return T.nth(a, 2, "previousSibling")
        },
        nextAll: function(a) {
            return T.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return T.dir(a, "previousSibling")
        },
        siblings: function(a) {
            return T.sibling(a.parentNode.firstChild, a)
        },
        children: function(a) {
            return T.sibling(a.firstChild)
        },
        contents: function(a) {
            return T.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : T.makeArray(a.childNodes)
        }
    }, function(b, a) {
        T.fn[b] = function(d) {
            var c = T.map(this, a);
            if (d && typeof d == "string") {
                c = T.multiFilter(d, c)
            }
            return this.pushStack(T.unique(c), b, d)
        }
    });
    T.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(b, a) {
        T.fn[b] = function(i) {
            var e = []
              , c = T(i);
            for (var d = 0, g = c.length; d < g; d++) {
                var f = (d > 0 ? this.clone(true) : this).get();
                T.fn[a].apply(T(c[d]), f);
                e = e.concat(f)
            }
            return this.pushStack(e, b, i)
        }
    });
    T.each({
        removeAttr: function(a) {
            T.attr(this, a, "");
            if (this.nodeType == 1) {
                this.removeAttribute(a)
            }
        },
        addClass: function(a) {
            T.className.add(this, a)
        },
        removeClass: function(a) {
            T.className.remove(this, a)
        },
        toggleClass: function(a, b) {
            if (typeof b !== "boolean") {
                b = !T.className.has(this, a)
            }
            T.className[b ? "add" : "remove"](this, a)
        },
        remove: function(a) {
            if (!a || T.filter(a, [this]).length) {
                T("*", this).add([this]).each(function() {
                    T.event.remove(this);
                    T.removeData(this)
                });
                if (this.parentNode) {
                    this.parentNode.removeChild(this)
                }
            }
        },
        empty: function() {
            T(this).children().remove();
            while (this.firstChild) {
                this.removeChild(this.firstChild)
            }
        }
    }, function(b, a) {
        T.fn[b] = function() {
            return this.each(a, arguments)
        }
    });
    function Y(b, a) {
        return b[0] && parseInt(T.curCSS(b[0], a, true), 10) || 0
    }
    var aa = "jQuery" + ad()
      , I = 0
      , R = {};
    T.extend({
        cache: {},
        data: function(c, d, b) {
            c = c == W ? R : c;
            var a = c[aa];
            if (!a) {
                a = c[aa] = ++I
            }
            if (d && !T.cache[a]) {
                T.cache[a] = {}
            }
            if (b !== ab) {
                T.cache[a][d] = b
            }
            return d ? T.cache[a][d] : a
        },
        removeData: function(c, d) {
            c = c == W ? R : c;
            var a = c[aa];
            if (d) {
                if (T.cache[a]) {
                    delete T.cache[a][d];
                    d = "";
                    for (d in T.cache[a]) {
                        break
                    }
                    if (!d) {
                        T.removeData(c)
                    }
                }
            } else {
                try {
                    delete c[aa]
                } catch (b) {
                    if (c.removeAttribute) {
                        c.removeAttribute(aa)
                    }
                }
                delete T.cache[a]
            }
        },
        queue: function(c, d, a) {
            if (c) {
                d = (d || "fx") + "queue";
                var b = T.data(c, d);
                if (!b || T.isArray(a)) {
                    b = T.data(c, d, T.makeArray(a))
                } else {
                    if (a) {
                        b.push(a)
                    }
                }
            }
            return b
        },
        dequeue: function(a, b) {
            var d = T.queue(a, b)
              , c = d.shift();
            if (!b || b === "fx") {
                c = d[0]
            }
            if (c !== ab) {
                c.call(a)
            }
        }
    });
    T.fn.extend({
        data: function(d, b) {
            var a = d.split(".");
            a[1] = a[1] ? "." + a[1] : "";
            if (b === ab) {
                var c = this.triggerHandler("getData" + a[1] + "!", [a[0]]);
                if (c === ab && this.length) {
                    c = T.data(this[0], d)
                }
                return c === ab && a[1] ? this.data(a[0]) : c
            } else {
                return this.trigger("setData" + a[1] + "!", [a[0], b]).each(function() {
                    T.data(this, d, b)
                })
            }
        },
        removeData: function(a) {
            return this.each(function() {
                T.removeData(this, a)
            })
        },
        queue: function(b, a) {
            if (typeof b !== "string") {
                a = b;
                b = "fx"
            }
            if (a === ab) {
                return T.queue(this[0], b)
            }
            return this.each(function() {
                var c = T.queue(this, b, a);
                if (b == "fx" && c.length == 1) {
                    c[0].call(this)
                }
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                T.dequeue(this, a)
            })
        }
    });
    (function() {
        var b = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g
          , i = 0
          , n = Object.prototype.toString;
        var p = function(u, y, al, ak) {
            al = al || [];
            y = y || document;
            if (y.nodeType !== 1 && y.nodeType !== 9) {
                return []
            }
            if (!u || typeof u !== "string") {
                return al
            }
            var t = [], w, D, A, z, aj, x, v = true;
            b.lastIndex = 0;
            while ((w = b.exec(u)) !== null) {
                t.push(w[1]);
                if (w[2]) {
                    x = RegExp.rightContext;
                    break
                }
            }
            if (t.length > 1 && g.exec(u)) {
                if (t.length === 2 && l.relative[t[0]]) {
                    D = k(t[0] + t[1], y)
                } else {
                    D = l.relative[t[0]] ? [y] : p(t.shift(), y);
                    while (t.length) {
                        u = t.shift();
                        if (l.relative[u]) {
                            u += t.shift()
                        }
                        D = k(u, D)
                    }
                }
            } else {
                var ai = ak ? {
                    expr: t.pop(),
                    set: q(ak)
                } : p.find(t.pop(), t.length === 1 && y.parentNode ? y.parentNode : y, c(y));
                D = p.filter(ai.expr, ai.set);
                if (t.length > 0) {
                    A = q(D)
                } else {
                    v = false
                }
                while (t.length) {
                    var B = t.pop()
                      , C = B;
                    if (!l.relative[B]) {
                        B = ""
                    } else {
                        C = t.pop()
                    }
                    if (C == null) {
                        C = y
                    }
                    l.relative[B](A, C, c(y))
                }
            }
            if (!A) {
                A = D
            }
            if (!A) {
                throw "Syntax error, unrecognized expression: " + (B || u)
            }
            if (n.call(A) === "[object Array]") {
                if (!v) {
                    al.push.apply(al, A)
                } else {
                    if (y.nodeType === 1) {
                        for (var r = 0; A[r] != null; r++) {
                            if (A[r] && (A[r] === true || A[r].nodeType === 1 && j(y, A[r]))) {
                                al.push(D[r])
                            }
                        }
                    } else {
                        for (var r = 0; A[r] != null; r++) {
                            if (A[r] && A[r].nodeType === 1) {
                                al.push(D[r])
                            }
                        }
                    }
                }
            } else {
                q(A, al)
            }
            if (x) {
                p(x, y, al, ak);
                if (o) {
                    hasDuplicate = false;
                    al.sort(o);
                    if (hasDuplicate) {
                        for (var r = 1; r < al.length; r++) {
                            if (al[r] === al[r - 1]) {
                                al.splice(r--, 1)
                            }
                        }
                    }
                }
            }
            return al
        };
        p.matches = function(t, r) {
            return p(t, null, null, r)
        }
        ;
        p.find = function(r, z, A) {
            var t, v;
            if (!r) {
                return []
            }
            for (var w = 0, x = l.order.length; w < x; w++) {
                var u = l.order[w], v;
                if ((v = l.match[u].exec(r))) {
                    var y = RegExp.leftContext;
                    if (y.substr(y.length - 1) !== "\\") {
                        v[1] = (v[1] || "").replace(/\\/g, "");
                        t = l.find[u](v, z, A);
                        if (t != null) {
                            r = r.replace(l.match[u], "");
                            break
                        }
                    }
                }
            }
            if (!t) {
                t = z.getElementsByTagName("*")
            }
            return {
                set: t,
                expr: r
            }
        }
        ;
        p.filter = function(aj, ak, C, w) {
            var x = aj, A = [], r = ak, u, z, t = ak && ak[0] && c(ak[0]);
            while (aj && ak.length) {
                for (var al in l.filter) {
                    if ((u = l.match[al].exec(aj)) != null) {
                        var y = l.filter[al], B, D;
                        z = false;
                        if (r == A) {
                            A = []
                        }
                        if (l.preFilter[al]) {
                            u = l.preFilter[al](u, r, C, A, w, t);
                            if (!u) {
                                z = B = true
                            } else {
                                if (u === true) {
                                    continue
                                }
                            }
                        }
                        if (u) {
                            for (var v = 0; (D = r[v]) != null; v++) {
                                if (D) {
                                    B = y(D, u, v, r);
                                    var ai = w ^ !!B;
                                    if (C && B != null) {
                                        if (ai) {
                                            z = true
                                        } else {
                                            r[v] = false
                                        }
                                    } else {
                                        if (ai) {
                                            A.push(D);
                                            z = true
                                        }
                                    }
                                }
                            }
                        }
                        if (B !== ab) {
                            if (!C) {
                                r = A
                            }
                            aj = aj.replace(l.match[al], "");
                            if (!z) {
                                return []
                            }
                            break
                        }
                    }
                }
                if (aj == x) {
                    if (z == null) {
                        throw "Syntax error, unrecognized expression: " + aj
                    } else {
                        break
                    }
                }
                x = aj
            }
            return r
        }
        ;
        var l = p.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
            },
            attrMap: {
                "class": "className",
                "for": "htmlFor"
            },
            attrHandle: {
                href: function(r) {
                    return r.getAttribute("href")
                }
            },
            relative: {
                "+": function(r, z, t) {
                    var v = typeof z === "string"
                      , A = v && !/\W/.test(z)
                      , u = v && !A;
                    if (A && !t) {
                        z = z.toUpperCase()
                    }
                    for (var w = 0, x = r.length, y; w < x; w++) {
                        if ((y = r[w])) {
                            while ((y = y.previousSibling) && y.nodeType !== 1) {}
                            r[w] = u || y && y.nodeName === z ? y || false : y === z
                        }
                    }
                    if (u) {
                        p.filter(z, r, true)
                    }
                },
                ">": function(x, u, w) {
                    var z = typeof u === "string";
                    if (z && !/\W/.test(u)) {
                        u = w ? u : u.toUpperCase();
                        for (var t = 0, v = x.length; t < v; t++) {
                            var y = x[t];
                            if (y) {
                                var r = y.parentNode;
                                x[t] = r.nodeName === u ? r : false
                            }
                        }
                    } else {
                        for (var t = 0, v = x.length; t < v; t++) {
                            var y = x[t];
                            if (y) {
                                x[t] = z ? y.parentNode : y.parentNode === u
                            }
                        }
                        if (z) {
                            p.filter(u, x, true)
                        }
                    }
                },
                "": function(r, u, w) {
                    var t = i++
                      , v = a;
                    if (!u.match(/\W/)) {
                        var x = u = w ? u : u.toUpperCase();
                        v = d
                    }
                    v("parentNode", u, t, r, x, w)
                },
                "~": function(r, u, w) {
                    var t = i++
                      , v = a;
                    if (typeof u === "string" && !u.match(/\W/)) {
                        var x = u = w ? u : u.toUpperCase();
                        v = d
                    }
                    v("previousSibling", u, t, r, x, w)
                }
            },
            find: {
                ID: function(u, t, r) {
                    if (typeof t.getElementById !== "undefined" && !r) {
                        var v = t.getElementById(u[1]);
                        return v ? [v] : []
                    }
                },
                NAME: function(t, x, w) {
                    if (typeof x.getElementsByName !== "undefined") {
                        var u = []
                          , y = x.getElementsByName(t[1]);
                        for (var r = 0, v = y.length; r < v; r++) {
                            if (y[r].getAttribute("name") === t[1]) {
                                u.push(y[r])
                            }
                        }
                        return u.length === 0 ? null : u
                    }
                },
                TAG: function(t, r) {
                    return r.getElementsByTagName(t[1])
                }
            },
            preFilter: {
                CLASS: function(r, u, t, v, x, w) {
                    r = " " + r[1].replace(/\\/g, "") + " ";
                    if (w) {
                        return r
                    }
                    for (var z = 0, y; (y = u[z]) != null; z++) {
                        if (y) {
                            if (x ^ (y.className && (" " + y.className + " ").indexOf(r) >= 0)) {
                                if (!t) {
                                    v.push(y)
                                }
                            } else {
                                if (t) {
                                    u[z] = false
                                }
                            }
                        }
                    }
                    return false
                },
                ID: function(r) {
                    return r[1].replace(/\\/g, "")
                },
                TAG: function(t, u) {
                    for (var r = 0; u[r] === false; r++) {}
                    return u[r] && c(u[r]) ? t[1] : t[1].toUpperCase()
                },
                CHILD: function(t) {
                    if (t[1] == "nth") {
                        var r = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(t[2] == "even" && "2n" || t[2] == "odd" && "2n+1" || !/\D/.test(t[2]) && "0n+" + t[2] || t[2]);
                        t[2] = (r[1] + (r[2] || 1)) - 0;
                        t[3] = r[3] - 0
                    }
                    t[0] = i++;
                    return t
                },
                ATTR: function(y, u, t, v, x, w) {
                    var r = y[1].replace(/\\/g, "");
                    if (!w && l.attrMap[r]) {
                        y[1] = l.attrMap[r]
                    }
                    if (y[2] === "~=") {
                        y[4] = " " + y[4] + " "
                    }
                    return y
                },
                PSEUDO: function(x, u, t, v, w) {
                    if (x[1] === "not") {
                        if (x[3].match(b).length > 1 || /^\w/.test(x[3])) {
                            x[3] = p(x[3], null, null, u)
                        } else {
                            var r = p.filter(x[3], u, t, true ^ w);
                            if (!t) {
                                v.push.apply(v, r)
                            }
                            return false
                        }
                    } else {
                        if (l.match.POS.test(x[0]) || l.match.CHILD.test(x[0])) {
                            return true
                        }
                    }
                    return x
                },
                POS: function(r) {
                    r.unshift(true);
                    return r
                }
            },
            filters: {
                enabled: function(r) {
                    return r.disabled === false && r.type !== "hidden"
                },
                disabled: function(r) {
                    return r.disabled === true
                },
                checked: function(r) {
                    return r.checked === true
                },
                selected: function(r) {
                    r.parentNode.selectedIndex;
                    return r.selected === true
                },
                parent: function(r) {
                    return !!r.firstChild
                },
                empty: function(r) {
                    return !r.firstChild
                },
                has: function(r, t, u) {
                    return !!p(u[3], r).length
                },
                header: function(r) {
                    return /h\d/i.test(r.nodeName)
                },
                text: function(r) {
                    return "text" === r.type
                },
                radio: function(r) {
                    return "radio" === r.type
                },
                checkbox: function(r) {
                    return "checkbox" === r.type
                },
                file: function(r) {
                    return "file" === r.type
                },
                password: function(r) {
                    return "password" === r.type
                },
                submit: function(r) {
                    return "submit" === r.type
                },
                image: function(r) {
                    return "image" === r.type
                },
                reset: function(r) {
                    return "reset" === r.type
                },
                button: function(r) {
                    return "button" === r.type || r.nodeName.toUpperCase() === "BUTTON"
                },
                input: function(r) {
                    return /input|select|textarea|button/i.test(r.nodeName)
                }
            },
            setFilters: {
                first: function(r, t) {
                    return t === 0
                },
                last: function(t, u, v, r) {
                    return u === r.length - 1
                },
                even: function(r, t) {
                    return t % 2 === 0
                },
                odd: function(r, t) {
                    return t % 2 === 1
                },
                lt: function(r, t, u) {
                    return t < u[3] - 0
                },
                gt: function(r, t, u) {
                    return t > u[3] - 0
                },
                nth: function(r, t, u) {
                    return u[3] - 0 == t
                },
                eq: function(r, t, u) {
                    return u[3] - 0 == t
                }
            },
            filter: {
                PSEUDO: function(x, t, r, w) {
                    var u = t[1]
                      , z = l.filters[u];
                    if (z) {
                        return z(x, r, t, w)
                    } else {
                        if (u === "contains") {
                            return (x.textContent || x.innerText || "").indexOf(t[3]) >= 0
                        } else {
                            if (u === "not") {
                                var y = t[3];
                                for (var r = 0, v = y.length; r < v; r++) {
                                    if (y[r] === x) {
                                        return false
                                    }
                                }
                                return true
                            }
                        }
                    }
                },
                CHILD: function(z, w) {
                    var t = w[1]
                      , y = z;
                    switch (t) {
                    case "only":
                    case "first":
                        while (y = y.previousSibling) {
                            if (y.nodeType === 1) {
                                return false
                            }
                        }
                        if (t == "first") {
                            return true
                        }
                        y = z;
                    case "last":
                        while (y = y.nextSibling) {
                            if (y.nodeType === 1) {
                                return false
                            }
                        }
                        return true;
                    case "nth":
                        var x = w[2]
                          , A = w[3];
                        if (x == 1 && A == 0) {
                            return true
                        }
                        var u = w[0]
                          , B = z.parentNode;
                        if (B && (B.sizcache !== u || !z.nodeIndex)) {
                            var v = 0;
                            for (y = B.firstChild; y; y = y.nextSibling) {
                                if (y.nodeType === 1) {
                                    y.nodeIndex = ++v
                                }
                            }
                            B.sizcache = u
                        }
                        var r = z.nodeIndex - A;
                        if (x == 0) {
                            return r == 0
                        } else {
                            return (r % x == 0 && r / x >= 0)
                        }
                    }
                },
                ID: function(r, t) {
                    return r.nodeType === 1 && r.getAttribute("id") === t
                },
                TAG: function(r, t) {
                    return (t === "*" && r.nodeType === 1) || r.nodeName === t
                },
                CLASS: function(r, t) {
                    return (" " + (r.className || r.getAttribute("class")) + " ").indexOf(t) > -1
                },
                ATTR: function(x, r) {
                    var t = r[1]
                      , v = l.attrHandle[t] ? l.attrHandle[t](x) : x[t] != null ? x[t] : x.getAttribute(t)
                      , w = v + ""
                      , y = r[2]
                      , u = r[4];
                    return v == null ? y === "!=" : y === "=" ? w === u : y === "*=" ? w.indexOf(u) >= 0 : y === "~=" ? (" " + w + " ").indexOf(u) >= 0 : !u ? w && v !== false : y === "!=" ? w != u : y === "^=" ? w.indexOf(u) === 0 : y === "$=" ? w.substr(w.length - u.length) === u : y === "|=" ? w === u || w.substr(0, u.length + 1) === u + "-" : false
                },
                POS: function(x, u, t, w) {
                    var v = u[2]
                      , r = l.setFilters[v];
                    if (r) {
                        return r(x, t, u, w)
                    }
                }
            }
        };
        var g = l.match.POS;
        for (var e in l.match) {
            l.match[e] = RegExp(l.match[e].source + /(?![^\[]*\])(?![^\(]*\))/.source)
        }
        var q = function(r, t) {
            r = Array.prototype.slice.call(r);
            if (t) {
                t.push.apply(t, r);
                return t
            }
            return r
        };
        try {
            Array.prototype.slice.call(document.documentElement.childNodes)
        } catch (f) {
            q = function(w, r) {
                var u = r || [];
                if (n.call(w) === "[object Array]") {
                    Array.prototype.push.apply(u, w)
                } else {
                    if (typeof w.length === "number") {
                        for (var t = 0, v = w.length; t < v; t++) {
                            u.push(w[t])
                        }
                    } else {
                        for (var t = 0; w[t]; t++) {
                            u.push(w[t])
                        }
                    }
                }
                return u
            }
        }
        var o;
        if (document.documentElement.compareDocumentPosition) {
            o = function(t, u) {
                var r = t.compareDocumentPosition(u) & 4 ? -1 : t === u ? 0 : 1;
                if (r === 0) {
                    hasDuplicate = true
                }
                return r
            }
        } else {
            if ("sourceIndex"in document.documentElement) {
                o = function(t, u) {
                    var r = t.sourceIndex - u.sourceIndex;
                    if (r === 0) {
                        hasDuplicate = true
                    }
                    return r
                }
            } else {
                if (document.createRange) {
                    o = function(r, u) {
                        var t = r.ownerDocument.createRange()
                          , v = u.ownerDocument.createRange();
                        t.selectNode(r);
                        t.collapse(true);
                        v.selectNode(u);
                        v.collapse(true);
                        var w = t.compareBoundaryPoints(Range.START_TO_END, v);
                        if (w === 0) {
                            hasDuplicate = true
                        }
                        return w
                    }
                }
            }
        }
        (function() {
            var t = document.createElement("form")
              , r = "script" + (new Date).getTime();
            t.innerHTML = "<input name='" + r + "'/>";
            var u = document.documentElement;
            u.insertBefore(t, u.firstChild);
            if (!!document.getElementById(r)) {
                l.find.ID = function(y, x, w) {
                    if (typeof x.getElementById !== "undefined" && !w) {
                        var v = x.getElementById(y[1]);
                        return v ? v.id === y[1] || typeof v.getAttributeNode !== "undefined" && v.getAttributeNode("id").nodeValue === y[1] ? [v] : ab : []
                    }
                }
                ;
                l.filter.ID = function(w, v) {
                    var x = typeof w.getAttributeNode !== "undefined" && w.getAttributeNode("id");
                    return w.nodeType === 1 && x && x.nodeValue === v
                }
            }
            u.removeChild(t)
        }
        )();
        (function() {
            var r = document.createElement("div");
            r.appendChild(document.createComment(""));
            if (r.getElementsByTagName("*").length > 0) {
                l.find.TAG = function(v, w) {
                    var x = w.getElementsByTagName(v[1]);
                    if (v[1] === "*") {
                        var t = [];
                        for (var u = 0; x[u]; u++) {
                            if (x[u].nodeType === 1) {
                                t.push(x[u])
                            }
                        }
                        x = t
                    }
                    return x
                }
            }
            r.innerHTML = "<a href='#'></a>";
            if (r.firstChild && typeof r.firstChild.getAttribute !== "undefined" && r.firstChild.getAttribute("href") !== "#") {
                l.attrHandle.href = function(t) {
                    return t.getAttribute("href", 2)
                }
            }
        }
        )();
        if (document.querySelectorAll) {
            (function() {
                var t = p
                  , r = document.createElement("div");
                r.innerHTML = "<p class='TEST'></p>";
                if (r.querySelectorAll && r.querySelectorAll(".TEST").length === 0) {
                    return
                }
                p = function(x, y, v, u) {
                    y = y || document;
                    if (!u && y.nodeType === 9 && !c(y)) {
                        try {
                            return q(y.querySelectorAll(x), v)
                        } catch (w) {}
                    }
                    return t(x, y, v, u)
                }
                ;
                p.find = t.find;
                p.filter = t.filter;
                p.selectors = t.selectors;
                p.matches = t.matches
            }
            )()
        }
        if (document.getElementsByClassName && document.documentElement.getElementsByClassName) {
            (function() {
                var r = document.createElement("div");
                r.innerHTML = "<div class='test e'></div><div class='test'></div>";
                if (r.getElementsByClassName("e").length === 0) {
                    return
                }
                r.lastChild.className = "e";
                if (r.getElementsByClassName("e").length === 1) {
                    return
                }
                l.order.splice(1, 0, "CLASS");
                l.find.CLASS = function(v, u, t) {
                    if (typeof u.getElementsByClassName !== "undefined" && !t) {
                        return u.getElementsByClassName(v[1])
                    }
                }
            }
            )()
        }
        function d(y, t, u, A, r, B) {
            var C = y == "previousSibling" && !B;
            for (var w = 0, x = A.length; w < x; w++) {
                var z = A[w];
                if (z) {
                    if (C && z.nodeType === 1) {
                        z.sizcache = u;
                        z.sizset = w
                    }
                    z = z[y];
                    var v = false;
                    while (z) {
                        if (z.sizcache === u) {
                            v = A[z.sizset];
                            break
                        }
                        if (z.nodeType === 1 && !B) {
                            z.sizcache = u;
                            z.sizset = w
                        }
                        if (z.nodeName === t) {
                            v = z;
                            break
                        }
                        z = z[y]
                    }
                    A[w] = v
                }
            }
        }
        function a(y, t, u, A, r, B) {
            var C = y == "previousSibling" && !B;
            for (var w = 0, x = A.length; w < x; w++) {
                var z = A[w];
                if (z) {
                    if (C && z.nodeType === 1) {
                        z.sizcache = u;
                        z.sizset = w
                    }
                    z = z[y];
                    var v = false;
                    while (z) {
                        if (z.sizcache === u) {
                            v = A[z.sizset];
                            break
                        }
                        if (z.nodeType === 1) {
                            if (!B) {
                                z.sizcache = u;
                                z.sizset = w
                            }
                            if (typeof t !== "string") {
                                if (z === t) {
                                    v = true;
                                    break
                                }
                            } else {
                                if (p.filter(t, [z]).length > 0) {
                                    v = z;
                                    break
                                }
                            }
                        }
                        z = z[y]
                    }
                    A[w] = v
                }
            }
        }
        var j = document.compareDocumentPosition ? function(r, t) {
            return r.compareDocumentPosition(t) & 16
        }
        : function(r, t) {
            return r !== t && (r.contains ? r.contains(t) : true)
        }
        ;
        var c = function(r) {
            return r.nodeType === 9 && r.documentElement.nodeName !== "HTML" || !!r.ownerDocument && c(r.ownerDocument)
        };
        var k = function(v, x) {
            var r = [], z = "", y, t = x.nodeType ? [x] : x;
            while ((y = l.match.PSEUDO.exec(v))) {
                z += y[0];
                v = v.replace(l.match.PSEUDO, "")
            }
            v = l.relative[v] ? v + "*" : v;
            for (var w = 0, u = t.length; w < u; w++) {
                p(v, t[w], r)
            }
            return p.filter(z, r)
        };
        T.find = p;
        T.filter = p.filter;
        T.expr = p.selectors;
        T.expr[":"] = T.expr.filters;
        p.selectors.filters.hidden = function(r) {
            return r.offsetWidth === 0 || r.offsetHeight === 0
        }
        ;
        p.selectors.filters.visible = function(r) {
            return r.offsetWidth > 0 || r.offsetHeight > 0
        }
        ;
        p.selectors.filters.animated = function(r) {
            return T.grep(T.timers, function(t) {
                return r === t.elem
            }).length
        }
        ;
        T.multiFilter = function(r, u, t) {
            if (t) {
                r = ":not(" + r + ")"
            }
            return p.matches(r, u)
        }
        ;
        T.dir = function(t, u) {
            var v = []
              , r = t[u];
            while (r && r != document) {
                if (r.nodeType == 1) {
                    v.push(r)
                }
                r = r[u]
            }
            return v
        }
        ;
        T.nth = function(w, v, t, r) {
            v = v || 1;
            var u = 0;
            for (; w; w = w[t]) {
                if (w.nodeType == 1 && ++u == v) {
                    break
                }
            }
            return w
        }
        ;
        T.sibling = function(r, t) {
            var u = [];
            for (; r; r = r.nextSibling) {
                if (r.nodeType == 1 && r != t) {
                    u.push(r)
                }
            }
            return u
        }
        ;
        return;
        W.Sizzle = p
    }
    )();
    T.event = {
        add: function(c, f, d, a) {
            if (c.nodeType == 3 || c.nodeType == 8) {
                return
            }
            if (c.setInterval && c != W) {
                c = W
            }
            if (!d.guid) {
                d.guid = this.guid++
            }
            if (a !== ab) {
                var e = d;
                d = this.proxy(e);
                d.data = a
            }
            var g = T.data(c, "events") || T.data(c, "events", {})
              , b = T.data(c, "handle") || T.data(c, "handle", function() {
                return typeof T !== "undefined" && !T.event.triggered ? T.event.handle.apply(arguments.callee.elem, arguments) : ab
            });
            b.elem = c;
            T.each(f.split(/\s+/), function(l, k) {
                var j = k.split(".");
                k = j.shift();
                d.type = j.slice().sort().join(".");
                var i = g[k];
                if (T.event.specialAll[k]) {
                    T.event.specialAll[k].setup.call(c, a, j)
                }
                if (!i) {
                    i = g[k] = {};
                    if (!T.event.special[k] || T.event.special[k].setup.call(c, a, j) === false) {
                        if (c.addEventListener) {
                            c.addEventListener(k, b, false)
                        } else {
                            if (c.attachEvent) {
                                c.attachEvent("on" + k, b)
                            }
                        }
                    }
                }
                i[d.guid] = d;
                T.event.global[k] = true
            });
            c = null
        },
        guid: 1,
        global: {},
        remove: function(b, e, c) {
            if (b.nodeType == 3 || b.nodeType == 8) {
                return
            }
            var f = T.data(b, "events"), g, i;
            if (f) {
                if (e === ab || (typeof e === "string" && e.charAt(0) == ".")) {
                    for (var d in f) {
                        this.remove(b, d + (e || ""))
                    }
                } else {
                    if (e.type) {
                        c = e.handler;
                        e = e.type
                    }
                    T.each(e.split(/\s+/), function(o, l) {
                        var j = l.split(".");
                        l = j.shift();
                        var n = RegExp("(^|\\.)" + j.slice().sort().join(".*\\.") + "(\\.|$)");
                        if (f[l]) {
                            if (c) {
                                delete f[l][c.guid]
                            } else {
                                for (var k in f[l]) {
                                    if (n.test(f[l][k].type)) {
                                        delete f[l][k]
                                    }
                                }
                            }
                            if (T.event.specialAll[l]) {
                                T.event.specialAll[l].teardown.call(b, j)
                            }
                            for (g in f[l]) {
                                break
                            }
                            if (!g) {
                                if (!T.event.special[l] || T.event.special[l].teardown.call(b, j) === false) {
                                    if (b.removeEventListener) {
                                        b.removeEventListener(l, T.data(b, "handle"), false)
                                    } else {
                                        if (b.detachEvent) {
                                            b.detachEvent("on" + l, T.data(b, "handle"))
                                        }
                                    }
                                }
                                g = null;
                                delete f[l]
                            }
                        }
                    })
                }
                for (g in f) {
                    break
                }
                if (!g) {
                    var a = T.data(b, "handle");
                    if (a) {
                        a.elem = null
                    }
                    T.removeData(b, "events");
                    T.removeData(b, "handle")
                }
            }
        },
        trigger: function(d, b, e, i) {
            var f = d.type || d;
            if (!i) {
                d = typeof d === "object" ? d[aa] ? d : T.extend(T.Event(f), d) : T.Event(f);
                if (f.indexOf("!") >= 0) {
                    d.type = f = f.slice(0, -1);
                    d.exclusive = true
                }
                if (!e) {
                    d.stopPropagation();
                    if (this.global[f]) {
                        T.each(T.cache, function() {
                            if (this.events && this.events[f]) {
                                T.event.trigger(d, b, this.handle.elem)
                            }
                        })
                    }
                }
                if (!e || e.nodeType == 3 || e.nodeType == 8) {
                    return ab
                }
                d.result = ab;
                d.target = e;
                b = T.makeArray(b);
                b.unshift(d)
            }
            d.currentTarget = e;
            var c = T.data(e, "handle");
            if (c) {
                c.apply(e, b)
            }
            if ((!e[f] || (T.nodeName(e, "a") && f == "click")) && e["on" + f] && e["on" + f].apply(e, b) === false) {
                d.result = false
            }
            if (!i && e[f] && !d.isDefaultPrevented() && !(T.nodeName(e, "a") && f == "click")) {
                this.triggered = true;
                try {
                    e[f]()
                } catch (a) {}
            }
            this.triggered = false;
            if (!d.isPropagationStopped()) {
                var g = e.parentNode || e.ownerDocument;
                if (g) {
                    T.event.trigger(d, b, g, true)
                }
            }
        },
        handle: function(b) {
            var c, i;
            b = arguments[0] = T.event.fix(b || W.event);
            b.currentTarget = this;
            var a = b.type.split(".");
            b.type = a.shift();
            c = !a.length && !b.exclusive;
            var d = RegExp("(^|\\.)" + a.slice().sort().join(".*\\.") + "(\\.|$)");
            i = (T.data(this, "events") || {})[b.type];
            for (var f in i) {
                var e = i[f];
                if (c || d.test(e.type)) {
                    b.handler = e;
                    b.data = e.data;
                    var g = e.apply(this, arguments);
                    if (g !== ab) {
                        b.result = g;
                        if (g === false) {
                            b.preventDefault();
                            b.stopPropagation()
                        }
                    }
                    if (b.isImmediatePropagationStopped()) {
                        break
                    }
                }
            }
        },
        props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
        fix: function(c) {
            if (c[aa]) {
                return c
            }
            var e = c;
            c = T.Event(e);
            for (var d = this.props.length, a; d; ) {
                a = this.props[--d];
                c[a] = e[a]
            }
            if (!c.target) {
                c.target = c.srcElement || document
            }
            if (c.target.nodeType == 3) {
                c.target = c.target.parentNode
            }
            if (!c.relatedTarget && c.fromElement) {
                c.relatedTarget = c.fromElement == c.target ? c.toElement : c.fromElement
            }
            if (c.pageX == null && c.clientX != null) {
                var b = document.documentElement
                  , f = document.body;
                c.pageX = c.clientX + (b && b.scrollLeft || f && f.scrollLeft || 0) - (b.clientLeft || 0);
                c.pageY = c.clientY + (b && b.scrollTop || f && f.scrollTop || 0) - (b.clientTop || 0)
            }
            if (!c.which && ((c.charCode || c.charCode === 0) ? c.charCode : c.keyCode)) {
                c.which = c.charCode || c.keyCode
            }
            if (!c.metaKey && c.ctrlKey) {
                c.metaKey = c.ctrlKey
            }
            if (!c.which && c.button) {
                c.which = (c.button & 1 ? 1 : (c.button & 2 ? 3 : (c.button & 4 ? 2 : 0)))
            }
            return c
        },
        proxy: function(a, b) {
            b = b || function() {
                return a.apply(this, arguments)
            }
            ;
            b.guid = a.guid = a.guid || b.guid || this.guid++;
            return b
        },
        special: {
            ready: {
                setup: P,
                teardown: function() {}
            }
        },
        specialAll: {
            live: {
                setup: function(b, a) {
                    T.event.add(this, a[0], af)
                },
                teardown: function(a) {
                    if (a.length) {
                        var c = 0
                          , b = RegExp("(^|\\.)" + a[0] + "(\\.|$)");
                        T.each((T.data(this, "events").live || {}), function() {
                            if (b.test(this.type)) {
                                c++
                            }
                        });
                        if (c < 1) {
                            T.event.remove(this, a[0], af)
                        }
                    }
                }
            }
        }
    };
    T.Event = function(a) {
        if (!this.preventDefault) {
            return new T.Event(a)
        }
        if (a && a.type) {
            this.originalEvent = a;
            this.type = a.type
        } else {
            this.type = a
        }
        this.timeStamp = ad();
        this[aa] = true
    }
    ;
    function X() {
        return false
    }
    function J() {
        return true
    }
    T.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = J;
            var a = this.originalEvent;
            if (!a) {
                return
            }
            if (a.preventDefault) {
                a.preventDefault()
            }
            a.returnValue = false
        },
        stopPropagation: function() {
            this.isPropagationStopped = J;
            var a = this.originalEvent;
            if (!a) {
                return
            }
            if (a.stopPropagation) {
                a.stopPropagation()
            }
            a.cancelBubble = true
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = J;
            this.stopPropagation()
        },
        isDefaultPrevented: X,
        isPropagationStopped: X,
        isImmediatePropagationStopped: X
    };
    var ah = function(b) {
        var c = b.relatedTarget;
        while (c && c != this) {
            try {
                c = c.parentNode
            } catch (a) {
                c = this
            }
        }
        if (c != this) {
            b.type = b.data;
            T.event.handle.apply(this, arguments)
        }
    };
    T.each({
        mouseover: "mouseenter",
        mouseout: "mouseleave"
    }, function(a, b) {
        T.event.special[b] = {
            setup: function() {
                T.event.add(this, a, ah, b)
            },
            teardown: function() {
                T.event.remove(this, a, ah)
            }
        }
    });
    T.fn.extend({
        bind: function(b, a, c) {
            return b == "unload" ? this.one(b, a, c) : this.each(function() {
                T.event.add(this, b, c || a, c && a)
            })
        },
        one: function(b, a, c) {
            var d = T.event.proxy(c || a, function(e) {
                T(this).unbind(e, d);
                return (c || a).apply(this, arguments)
            });
            return this.each(function() {
                T.event.add(this, b, d, c && a)
            })
        },
        unbind: function(a, b) {
            return this.each(function() {
                T.event.remove(this, a, b)
            })
        },
        trigger: function(b, a) {
            return this.each(function() {
                T.event.trigger(b, a, this)
            })
        },
        triggerHandler: function(c, a) {
            if (this[0]) {
                var b = T.Event(c);
                b.preventDefault();
                b.stopPropagation();
                T.event.trigger(b, a, this[0]);
                return b.result
            }
        },
        toggle: function(a) {
            var c = arguments
              , b = 1;
            while (b < c.length) {
                T.event.proxy(a, c[b++])
            }
            return this.click(T.event.proxy(a, function(d) {
                this.lastToggle = (this.lastToggle || 0) % b;
                d.preventDefault();
                return c[this.lastToggle++].apply(this, arguments) || false
            }))
        },
        hover: function(b, a) {
            return this.mouseenter(b).mouseleave(a)
        },
        ready: function(a) {
            P();
            if (T.isReady) {
                a.call(document, T)
            } else {
                T.readyList.push(a)
            }
            return this
        },
        live: function(a, b) {
            var c = T.event.proxy(b);
            c.guid += this.selector + a;
            T(document).bind(Z(a, this.selector), this.selector, c);
            return this
        },
        die: function(a, b) {
            T(document).unbind(Z(a, this.selector), b ? {
                guid: b.guid + this.selector + a
            } : null);
            return this
        }
    });
    function af(a) {
        var d = RegExp("(^|\\.)" + a.type + "(\\.|$)")
          , b = true
          , c = [];
        T.each(T.data(this, "events").live || [], function(g, f) {
            if (d.test(f.type)) {
                var e = T(a.target).closest(f.data)[0];
                if (e) {
                    c.push({
                        elem: e,
                        fn: f
                    })
                }
            }
        });
        c.sort(function(e, f) {
            return T.data(e.elem, "closest") - T.data(f.elem, "closest")
        });
        T.each(c, function() {
            if (this.fn.call(this.elem, a, this.fn.data) === false) {
                return (b = false)
            }
        });
        return b
    }
    function Z(a, b) {
        return ["live", a, b.replace(/\./g, "`").replace(/ /g, "|")].join(".")
    }
    T.extend({
        isReady: false,
        readyList: [],
        ready: function() {
            if (!T.isReady) {
                T.isReady = true;
                if (T.readyList) {
                    T.each(T.readyList, function() {
                        this.call(document, T)
                    });
                    T.readyList = null
                }
                T(document).triggerHandler("ready")
            }
        }
    });
    var G = false;
    function P() {
        if (G) {
            return
        }
        G = true;
        if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", function() {
                document.removeEventListener("DOMContentLoaded", arguments.callee, false);
                T.ready()
            }, false)
        } else {
            if (document.attachEvent) {
                document.attachEvent("onreadystatechange", function() {
                    if (document.readyState === "complete") {
                        document.detachEvent("onreadystatechange", arguments.callee);
                        T.ready()
                    }
                });
                if (document.documentElement.doScroll && W == W.top) {
                    (function() {
                        if (T.isReady) {
                            return
                        }
                        try {
                            document.documentElement.doScroll("left")
                        } catch (a) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        T.ready()
                    }
                    )()
                }
            }
        }
        T.event.add(W, "load", T.ready)
    }
    T.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","), function(a, b) {
        T.fn[b] = function(c) {
            return c ? this.bind(b, c) : this.trigger(b)
        }
    });
    T(W).bind("unload", function() {
        for (var a in T.cache) {
            if (a != 1 && T.cache[a].handle) {
                T.event.remove(T.cache[a].handle.elem)
            }
        }
    });
    (function() {
        T.support = {};
        var f = document.documentElement
          , e = document.createElement("script")
          , a = document.createElement("div")
          , b = "script" + (new Date).getTime();
        a.style.display = "none";
        a.innerHTML = '   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';
        var d = a.getElementsByTagName("*")
          , g = a.getElementsByTagName("a")[0];
        if (!d || !d.length || !g) {
            return
        }
        T.support = {
            leadingWhitespace: a.firstChild.nodeType == 3,
            tbody: !a.getElementsByTagName("tbody").length,
            objectAll: !!a.getElementsByTagName("object")[0].getElementsByTagName("*").length,
            htmlSerialize: !!a.getElementsByTagName("link").length,
            style: /red/.test(g.getAttribute("style")),
            hrefNormalized: g.getAttribute("href") === "/a",
            opacity: g.style.opacity === "0.5",
            cssFloat: !!g.style.cssFloat,
            scriptEval: false,
            noCloneEvent: true,
            boxModel: null
        };
        e.type = "text/javascript";
        try {
            e.appendChild(document.createTextNode("window." + b + "=1;"))
        } catch (c) {}
        f.insertBefore(e, f.firstChild);
        if (W[b]) {
            T.support.scriptEval = true;
            delete W[b]
        }
        f.removeChild(e);
        if (a.attachEvent && a.fireEvent) {
            a.attachEvent("onclick", function() {
                T.support.noCloneEvent = false;
                a.detachEvent("onclick", arguments.callee)
            });
            a.cloneNode(true).fireEvent("onclick")
        }
        T(function() {
            var i = document.createElement("div");
            i.style.width = i.style.paddingLeft = "1px";
            document.body.appendChild(i);
            T.boxModel = T.support.boxModel = i.offsetWidth === 2;
            document.body.removeChild(i).style.display = "none"
        })
    }
    )();
    var H = T.support.cssFloat ? "cssFloat" : "styleFloat";
    T.props = {
        "for": "htmlFor",
        "class": "className",
        "float": H,
        cssFloat: H,
        styleFloat: H,
        readonly: "readOnly",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        rowspan: "rowSpan",
        tabindex: "tabIndex"
    };
    T.fn.extend({
        _load: T.fn.load,
        load: function(e, b, a) {
            if (typeof e !== "string") {
                return this._load(e)
            }
            var c = e.indexOf(" ");
            if (c >= 0) {
                var g = e.slice(c, e.length);
                e = e.slice(0, c)
            }
            var d = "GET";
            if (b) {
                if (T.isFunction(b)) {
                    a = b;
                    b = null
                } else {
                    if (typeof b === "object") {
                        b = T.param(b);
                        d = "POST"
                    }
                }
            }
            var f = this;
            T.ajax({
                url: e,
                type: d,
                dataType: "html",
                data: b,
                complete: function(j, i) {
                    if (i == "success" || i == "notmodified") {
                        f.html(g ? T("<div/>").append(j.responseText.replace(/<script(.|\s)*?\/script>/g, "")).find(g) : j.responseText)
                    }
                    if (a) {
                        f.each(a, [j.responseText, i, j])
                    }
                }
            });
            return this
        },
        serialize: function() {
            return T.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? T.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password|search/i.test(this.type))
            }).map(function(c, b) {
                var a = T(this).val();
                return a == null ? null : T.isArray(a) ? T.map(a, function(d, e) {
                    return {
                        name: b.name,
                        value: d
                    }
                }) : {
                    name: b.name,
                    value: a
                }
            }).get()
        }
    });
    T.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","), function(b, a) {
        T.fn[a] = function(c) {
            return this.bind(a, c)
        }
    });
    var N = ad();
    T.extend({
        get: function(d, b, a, c) {
            if (T.isFunction(b)) {
                a = b;
                b = null
            }
            return T.ajax({
                type: "GET",
                url: d,
                data: b,
                success: a,
                dataType: c
            })
        },
        getScript: function(b, a) {
            return T.get(b, null, a, "script")
        },
        getJSON: function(c, b, a) {
            return T.get(c, b, a, "json")
        },
        post: function(d, b, a, c) {
            if (T.isFunction(b)) {
                a = b;
                b = {}
            }
            return T.ajax({
                type: "POST",
                url: d,
                data: b,
                success: a,
                dataType: c
            })
        },
        ajaxSetup: function(a) {
            T.extend(T.ajaxSettings, a)
        },
        ajaxSettings: {
            url: location.href,
            global: true,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: true,
            async: true,
            xhr: function() {
                return W.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest()
            },
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                script: "text/javascript, application/javascript",
                json: "application/json, text/javascript",
                text: "text/plain",
                _default: "*/*"
            }
        },
        lastModified: {},
        ajax: function(l) {
            l = T.extend(true, l, T.extend(true, {}, T.ajaxSettings, l));
            var a, u = /=\?(&|$)/g, f, b, t = l.type.toUpperCase();
            if (l.data && l.processData && typeof l.data !== "string") {
                l.data = T.param(l.data)
            }
            if (l.dataType == "jsonp") {
                if (t == "GET") {
                    if (!l.url.match(u)) {
                        l.url += (l.url.match(/\?/) ? "&" : "?") + (l.jsonp || "callback") + "=?"
                    }
                } else {
                    if (!l.data || !l.data.match(u)) {
                        l.data = (l.data ? l.data + "&" : "") + (l.jsonp || "callback") + "=?"
                    }
                }
                l.dataType = "json"
            }
            if (l.dataType == "json" && (l.data && l.data.match(u) || l.url.match(u))) {
                a = "jsonp" + N++;
                if (l.data) {
                    l.data = (l.data + "").replace(u, "=" + a + "$1")
                }
                l.url = l.url.replace(u, "=" + a + "$1");
                l.dataType = "script";
                W[a] = function(x) {
                    b = x;
                    q();
                    n();
                    W[a] = ab;
                    try {
                        delete W[a]
                    } catch (w) {}
                    if (r) {
                        r.removeChild(d)
                    }
                }
            }
            if (l.dataType == "script" && l.cache == null) {
                l.cache = false
            }
            if (l.cache === false && t == "GET") {
                var v = ad();
                var c = l.url.replace(/(\?|&)_=.*?(&|$)/, "$1_=" + v + "$2");
                l.url = c + ((c == l.url) ? (l.url.match(/\?/) ? "&" : "?") + "_=" + v : "")
            }
            if (l.data && t == "GET") {
                l.url += (l.url.match(/\?/) ? "&" : "?") + l.data;
                l.data = null
            }
            if (l.global && !T.active++) {
                T.event.trigger("ajaxStart")
            }
            var g = /^(\w+:)?\/\/([^\/?#]+)/.exec(l.url);
            if (l.dataType == "script" && t == "GET" && g && (g[1] && g[1] != location.protocol || g[2] != location.host)) {
                var r = document.getElementsByTagName("head")[0];
                var d = document.createElement("script");
                d.src = l.url;
                if (l.scriptCharset) {
                    d.charset = l.scriptCharset
                }
                if (!a) {
                    var j = false;
                    d.onload = d.onreadystatechange = function() {
                        if (!j && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                            j = true;
                            q();
                            n();
                            d.onload = d.onreadystatechange = null;
                            r.removeChild(d)
                        }
                    }
                }
                r.appendChild(d);
                return ab
            }
            var o = false;
            var p = l.xhr();
            if (l.username) {
                p.open(t, l.url, l.async, l.username, l.password)
            } else {
                p.open(t, l.url, l.async)
            }
            try {
                if (l.data) {
                    p.setRequestHeader("Content-Type", l.contentType)
                }
                if (l.ifModified) {
                    p.setRequestHeader("If-Modified-Since", T.lastModified[l.url] || "Thu, 01 Jan 1970 00:00:00 GMT")
                }
                p.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                p.setRequestHeader("Accept", l.dataType && l.accepts[l.dataType] ? l.accepts[l.dataType] + ", */*" : l.accepts._default)
            } catch (e) {}
            if (l.beforeSend && l.beforeSend(p, l) === false) {
                if (l.global && !--T.active) {
                    T.event.trigger("ajaxStop")
                }
                p.abort();
                return false
            }
            if (l.global) {
                T.event.trigger("ajaxSend", [p, l])
            }
            var k = function(y) {
                if (p.readyState == 0) {
                    if (i) {
                        clearInterval(i);
                        i = null;
                        if (l.global && !--T.active) {
                            T.event.trigger("ajaxStop")
                        }
                    }
                } else {
                    if (!o && p && (p.readyState == 4 || y == "timeout")) {
                        o = true;
                        if (i) {
                            clearInterval(i);
                            i = null
                        }
                        f = y == "timeout" ? "timeout" : !T.httpSuccess(p) ? "error" : l.ifModified && T.httpNotModified(p, l.url) ? "notmodified" : "success";
                        if (f == "success") {
                            try {
                                b = T.httpData(p, l.dataType, l)
                            } catch (w) {
                                f = "parsererror"
                            }
                        }
                        if (f == "success") {
                            var x;
                            try {
                                x = p.getResponseHeader("Last-Modified")
                            } catch (w) {}
                            if (l.ifModified && x) {
                                T.lastModified[l.url] = x
                            }
                            if (!a) {
                                q()
                            }
                        } else {
                            T.handleError(l, p, f)
                        }
                        n();
                        if (y) {
                            p.abort()
                        }
                        if (l.async) {
                            p = null
                        }
                    }
                }
            };
            if (l.async) {
                var i = setInterval(k, 13);
                if (l.timeout > 0) {
                    setTimeout(function() {
                        if (p && !o) {
                            k("timeout")
                        }
                    }, l.timeout)
                }
            }
            try {
                p.send(l.data)
            } catch (e) {
                T.handleError(l, p, null, e)
            }
            if (!l.async) {
                k()
            }
            function q() {
                if (l.success) {
                    l.success(b, f)
                }
                if (l.global) {
                    T.event.trigger("ajaxSuccess", [p, l])
                }
            }
            function n() {
                if (l.complete) {
                    l.complete(p, f)
                }
                if (l.global) {
                    T.event.trigger("ajaxComplete", [p, l])
                }
                if (l.global && !--T.active) {
                    T.event.trigger("ajaxStop")
                }
            }
            return p
        },
        handleError: function(c, a, d, b) {
            if (c.error) {
                c.error(a, d, b)
            }
            if (c.global) {
                T.event.trigger("ajaxError", [a, c, b])
            }
        },
        active: 0,
        httpSuccess: function(a) {
            try {
                return !a.status && location.protocol == "file:" || (a.status >= 200 && a.status < 300) || a.status == 304 || a.status == 1223
            } catch (b) {}
            return false
        },
        httpNotModified: function(b, d) {
            try {
                var a = b.getResponseHeader("Last-Modified");
                return b.status == 304 || a == T.lastModified[d]
            } catch (c) {}
            return false
        },
        httpData: function(a, c, d) {
            var e = a.getResponseHeader("content-type")
              , f = c == "xml" || !c && e && e.indexOf("xml") >= 0
              , b = f ? a.responseXML : a.responseText;
            if (f && b.documentElement.tagName == "parsererror") {
                throw "parsererror"
            }
            if (d && d.dataFilter) {
                b = d.dataFilter(b, c)
            }
            if (typeof b === "string") {
                if (c == "script") {
                    T.globalEval(b)
                }
                if (c == "json") {
                    b = W["eval"]("(" + b + ")")
                }
            }
            return b
        },
        param: function(d) {
            var b = [];
            function a(f, e) {
                b[b.length] = encodeURIComponent(f) + "=" + encodeURIComponent(e)
            }
            if (T.isArray(d) || d.jquery) {
                T.each(d, function() {
                    a(this.name, this.value)
                })
            } else {
                for (var c in d) {
                    if (T.isArray(d[c])) {
                        T.each(d[c], function() {
                            a(c, this)
                        })
                    } else {
                        a(c, T.isFunction(d[c]) ? d[c]() : d[c])
                    }
                }
            }
            return b.join("&").replace(/%20/g, "+")
        }
    });
    var V = {}, U, ae = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]];
    function K(b, c) {
        var a = {};
        T.each(ae.concat.apply([], ae.slice(0, c)), function() {
            a[this] = b
        });
        return a
    }
    T.fn.extend({
        show: function(c, a) {
            if (c) {
                return this.animate(K("show", 3), c, a)
            } else {
                for (var e = 0, g = this.length; e < g; e++) {
                    var i = T.data(this[e], "olddisplay");
                    this[e].style.display = i || "";
                    if (T.css(this[e], "display") === "none") {
                        var f = this[e].tagName, b;
                        if (V[f]) {
                            b = V[f]
                        } else {
                            var d = T("<" + f + " />").appendTo("body");
                            b = d.css("display");
                            if (b === "none") {
                                b = "block"
                            }
                            d.remove();
                            V[f] = b
                        }
                        T.data(this[e], "olddisplay", b)
                    }
                }
                for (var e = 0, g = this.length; e < g; e++) {
                    this[e].style.display = T.data(this[e], "olddisplay") || ""
                }
                return this
            }
        },
        hide: function(b, a) {
            if (b) {
                return this.animate(K("hide", 3), b, a)
            } else {
                for (var c = 0, d = this.length; c < d; c++) {
                    var e = T.data(this[c], "olddisplay");
                    if (!e && e !== "none") {
                        T.data(this[c], "olddisplay", T.css(this[c], "display"))
                    }
                }
                for (var c = 0, d = this.length; c < d; c++) {
                    this[c].style.display = "none"
                }
                return this
            }
        },
        _toggle: T.fn.toggle,
        toggle: function(a, b) {
            var c = typeof a === "boolean";
            return T.isFunction(a) && T.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || c ? this.each(function() {
                var d = c ? a : T(this).is(":hidden");
                T(this)[d ? "show" : "hide"]()
            }) : this.animate(K("toggle", 3), a, b)
        },
        fadeTo: function(c, a, b) {
            return this.animate({
                opacity: a
            }, c, b)
        },
        animate: function(a, d, b, c) {
            var e = T.speed(d, b, c);
            return this[e.queue === false ? "each" : "queue"](function() {
                var g = T.extend({}, e), j, f = this.nodeType == 1 && T(this).is(":hidden"), i = this;
                for (j in a) {
                    if (a[j] == "hide" && f || a[j] == "show" && !f) {
                        return g.complete.call(this)
                    }
                    if ((j == "height" || j == "width") && this.style) {
                        g.display = T.css(this, "display");
                        g.overflow = this.style.overflow
                    }
                }
                if (g.overflow != null) {
                    this.style.overflow = "hidden"
                }
                g.curAnim = T.extend({}, a);
                T.each(a, function(q, l) {
                    var n = new T.fx(i,g,q);
                    if (/toggle|show|hide/.test(l)) {
                        n[l == "toggle" ? f ? "show" : "hide" : l](a)
                    } else {
                        var o = l.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/)
                          , k = n.cur(true) || 0;
                        if (o) {
                            var r = parseFloat(o[2])
                              , p = o[3] || "px";
                            if (p != "px") {
                                i.style[q] = (r || 1) + p;
                                k = ((r || 1) / n.cur(true)) * k;
                                i.style[q] = k + p
                            }
                            if (o[1]) {
                                r = ((o[1] == "-=" ? -1 : 1) * r) + k
                            }
                            n.custom(k, r, p)
                        } else {
                            n.custom(k, l, "")
                        }
                    }
                });
                return true
            })
        },
        stop: function(b, c) {
            var a = T.timers;
            if (b) {
                this.queue([])
            }
            this.each(function() {
                for (var d = a.length - 1; d >= 0; d--) {
                    if (a[d].elem == this) {
                        if (c) {
                            a[d](true)
                        }
                        a.splice(d, 1)
                    }
                }
            });
            if (!c) {
                this.dequeue()
            }
            return this
        }
    });
    T.each({
        slideDown: K("show", 1),
        slideUp: K("hide", 1),
        slideToggle: K("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        }
    }, function(b, a) {
        T.fn[b] = function(d, c) {
            return this.animate(a, d, c)
        }
    });
    T.extend({
        speed: function(b, a, c) {
            var d = typeof b === "object" ? b : {
                complete: c || !c && a || T.isFunction(b) && b,
                duration: b,
                easing: c && a || a && !T.isFunction(a) && a
            };
            d.duration = T.fx.off ? 0 : typeof d.duration === "number" ? d.duration : T.fx.speeds[d.duration] || T.fx.speeds._default;
            d.old = d.complete;
            d.complete = function() {
                if (d.queue !== false) {
                    T(this).dequeue()
                }
                if (T.isFunction(d.old)) {
                    d.old.call(this)
                }
            }
            ;
            return d
        },
        easing: {
            linear: function(b, a, d, c) {
                return d + c * b
            },
            swing: function(b, a, d, c) {
                return ((-Math.cos(b * Math.PI) / 2) + 0.5) * c + d
            }
        },
        timers: [],
        fx: function(b, c, a) {
            this.options = c;
            this.elem = b;
            this.prop = a;
            if (!c.orig) {
                c.orig = {}
            }
        }
    });
    T.fx.prototype = {
        update: function() {
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this)
            }
            (T.fx.step[this.prop] || T.fx.step._default)(this);
            if ((this.prop == "height" || this.prop == "width") && this.elem.style) {
                this.elem.style.display = "block"
            }
        },
        cur: function(a) {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
                return this.elem[this.prop]
            }
            var b = parseFloat(T.css(this.elem, this.prop, a));
            return b && b > -10000 ? b : parseFloat(T.curCSS(this.elem, this.prop)) || 0
        },
        custom: function(a, b, c) {
            this.startTime = ad();
            this.start = a;
            this.end = b;
            this.unit = c || this.unit || "px";
            this.now = this.start;
            this.pos = this.state = 0;
            var e = this;
            function d(f) {
                return e.step(f)
            }
            d.elem = this.elem;
            if (d() && T.timers.push(d) && !U) {
                U = setInterval(function() {
                    var f = T.timers;
                    for (var g = 0; g < f.length; g++) {
                        if (!f[g]()) {
                            f.splice(g--, 1)
                        }
                    }
                    if (!f.length) {
                        clearInterval(U);
                        U = ab
                    }
                }, 13)
            }
        },
        show: function() {
            this.options.orig[this.prop] = T.attr(this.elem.style, this.prop);
            this.options.show = true;
            this.custom(this.prop == "width" || this.prop == "height" ? 1 : 0, this.cur());
            T(this.elem).show()
        },
        hide: function() {
            this.options.orig[this.prop] = T.attr(this.elem.style, this.prop);
            this.options.hide = true;
            this.custom(this.cur(), 0)
        },
        step: function(c) {
            var d = ad();
            if (c || d >= this.options.duration + this.startTime) {
                this.now = this.end;
                this.pos = this.state = 1;
                this.update();
                this.options.curAnim[this.prop] = true;
                var f = true;
                for (var e in this.options.curAnim) {
                    if (this.options.curAnim[e] !== true) {
                        f = false
                    }
                }
                if (f) {
                    if (this.options.display != null) {
                        this.elem.style.overflow = this.options.overflow;
                        this.elem.style.display = this.options.display;
                        if (T.css(this.elem, "display") == "none") {
                            this.elem.style.display = "block"
                        }
                    }
                    if (this.options.hide) {
                        T(this.elem).hide()
                    }
                    if (this.options.hide || this.options.show) {
                        for (var b in this.options.curAnim) {
                            T.attr(this.elem.style, b, this.options.orig[b])
                        }
                    }
                    this.options.complete.call(this.elem)
                }
                return false
            } else {
                var a = d - this.startTime;
                this.state = a / this.options.duration;
                this.pos = T.easing[this.options.easing || (T.easing.swing ? "swing" : "linear")](this.state, a, 0, 1, this.options.duration);
                this.now = this.start + ((this.end - this.start) * this.pos);
                this.update()
            }
            return true
        }
    };
    T.extend(T.fx, {
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function(a) {
                T.attr(a.elem.style, "opacity", a.now)
            },
            _default: function(a) {
                if (a.elem.style && a.elem.style[a.prop] != null) {
                    a.elem.style[a.prop] = a.now + a.unit
                } else {
                    a.elem[a.prop] = a.now
                }
            }
        }
    });
    if (document.documentElement.getBoundingClientRect) {
        T.fn.offset = function() {
            if (!this[0]) {
                return {
                    top: 0,
                    left: 0
                }
            }
            if (this[0] === this[0].ownerDocument.body) {
                return T.offset.bodyOffset(this[0])
            }
            var f = this[0].getBoundingClientRect()
              , c = this[0].ownerDocument
              , g = c.body
              , i = c.documentElement
              , a = i.clientTop || g.clientTop || 0
              , b = i.clientLeft || g.clientLeft || 0
              , d = f.top + (self.pageYOffset || T.boxModel && i.scrollTop || g.scrollTop) - a
              , e = f.left + (self.pageXOffset || T.boxModel && i.scrollLeft || g.scrollLeft) - b;
            return {
                top: d,
                left: e
            }
        }
    } else {
        T.fn.offset = function() {
            if (!this[0]) {
                return {
                    top: 0,
                    left: 0
                }
            }
            if (this[0] === this[0].ownerDocument.body) {
                return T.offset.bodyOffset(this[0])
            }
            T.offset.initialized || T.offset.initialize();
            var f = this[0], j = f.offsetParent, k = f, a = f.ownerDocument, c, i = a.documentElement, e = a.body, d = a.defaultView, l = d.getComputedStyle(f, null), b = f.offsetTop, g = f.offsetLeft;
            while ((f = f.parentNode) && f !== e && f !== i) {
                c = d.getComputedStyle(f, null);
                b -= f.scrollTop,
                g -= f.scrollLeft;
                if (f === j) {
                    b += f.offsetTop,
                    g += f.offsetLeft;
                    if (T.offset.doesNotAddBorder && !(T.offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(f.tagName))) {
                        b += parseInt(c.borderTopWidth, 10) || 0,
                        g += parseInt(c.borderLeftWidth, 10) || 0
                    }
                    k = j,
                    j = f.offsetParent
                }
                if (T.offset.subtractsBorderForOverflowNotVisible && c.overflow !== "visible") {
                    b += parseInt(c.borderTopWidth, 10) || 0,
                    g += parseInt(c.borderLeftWidth, 10) || 0
                }
                l = c
            }
            if (l.position === "relative" || l.position === "static") {
                b += e.offsetTop,
                g += e.offsetLeft
            }
            if (l.position === "fixed") {
                b += Math.max(i.scrollTop, e.scrollTop),
                g += Math.max(i.scrollLeft, e.scrollLeft)
            }
            return {
                top: b,
                left: g
            }
        }
    }
    T.offset = {
        initialize: function() {
            if (this.initialized) {
                return
            }
            var c = document.body, j = document.createElement("div"), g, i, a, f, b, k, e = c.style.marginTop, d = '<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';
            b = {
                position: "absolute",
                top: 0,
                left: 0,
                margin: 0,
                border: 0,
                width: "1px",
                height: "1px",
                visibility: "hidden"
            };
            for (k in b) {
                j.style[k] = b[k]
            }
            j.innerHTML = d;
            c.insertBefore(j, c.firstChild);
            g = j.firstChild,
            i = g.firstChild,
            f = g.nextSibling.firstChild.firstChild;
            this.doesNotAddBorder = (i.offsetTop !== 5);
            this.doesAddBorderForTableAndCells = (f.offsetTop === 5);
            g.style.overflow = "hidden",
            g.style.position = "relative";
            this.subtractsBorderForOverflowNotVisible = (i.offsetTop === -5);
            c.style.marginTop = "1px";
            this.doesNotIncludeMarginInBodyOffset = (c.offsetTop === 0);
            c.style.marginTop = e;
            c.removeChild(j);
            this.initialized = true
        },
        bodyOffset: function(c) {
            T.offset.initialized || T.offset.initialize();
            var a = c.offsetTop
              , b = c.offsetLeft;
            if (T.offset.doesNotIncludeMarginInBodyOffset) {
                a += parseInt(T.curCSS(c, "marginTop", true), 10) || 0,
                b += parseInt(T.curCSS(c, "marginLeft", true), 10) || 0
            }
            return {
                top: a,
                left: b
            }
        }
    };
    T.fn.extend({
        position: function() {
            var b = 0, c = 0, e;
            if (this[0]) {
                var d = this.offsetParent()
                  , a = this.offset()
                  , f = /^body|html$/i.test(d[0].tagName) ? {
                    top: 0,
                    left: 0
                } : d.offset();
                a.top -= Y(this, "marginTop");
                a.left -= Y(this, "marginLeft");
                f.top += Y(d, "borderTopWidth");
                f.left += Y(d, "borderLeftWidth");
                e = {
                    top: a.top - f.top,
                    left: a.left - f.left
                }
            }
            return e
        },
        offsetParent: function() {
            var a = this[0].offsetParent || document.body;
            while (a && (!/^body|html$/i.test(a.tagName) && T.css(a, "position") == "static")) {
                a = a.offsetParent
            }
            return T(a)
        }
    });
    T.each(["Left", "Top"], function(b, c) {
        var a = "scroll" + c;
        T.fn[a] = function(d) {
            if (!this[0]) {
                return null
            }
            return d !== ab ? this.each(function() {
                this == W || this == document ? W.scrollTo(!b ? d : T(W).scrollLeft(), b ? d : T(W).scrollTop()) : this[a] = d
            }) : this[0] == W || this[0] == document ? self[b ? "pageYOffset" : "pageXOffset"] || T.boxModel && document.documentElement[a] || document.body[a] : this[0][a]
        }
    });
    T.each(["Height", "Width"], function(b, d) {
        var f = b ? "Left" : "Top"
          , c = b ? "Right" : "Bottom"
          , e = d.toLowerCase();
        T.fn["inner" + d] = function() {
            return this[0] ? T.css(this[0], e, false, "padding") : null
        }
        ;
        T.fn["outer" + d] = function(g) {
            return this[0] ? T.css(this[0], e, false, g ? "margin" : "border") : null
        }
        ;
        var a = d.toLowerCase();
        T.fn[a] = function(g) {
            return this[0] == W ? document.compatMode == "CSS1Compat" && document.documentElement["client" + d] || document.body["client" + d] : this[0] == document ? Math.max(document.documentElement["client" + d], document.body["scroll" + d], document.documentElement["scroll" + d], document.body["offset" + d], document.documentElement["offset" + d]) : g === ab ? (this.length ? T.css(this[0], a) : null) : this.css(a, typeof g === "string" ? g : g + "px")
        }
    })
}
)();
jQuery.cookie = function(x, p, i) {
    if (typeof p != "undefined") {
        i = i || {};
        if (p === null) {
            p = "";
            i.expires = -1
        }
        var u = "";
        if (i.expires && (typeof i.expires == "number" || i.expires.toUTCString)) {
            var t;
            if (typeof i.expires == "number") {
                t = new Date();
                t.setTime(t.getTime() + (i.expires * 24 * 60 * 60 * 1000))
            } else {
                t = i.expires
            }
            u = "; expires=" + t.toUTCString()
        }
        var n = i.path ? "; path=" + (i.path) : "";
        var r = i.domain ? "; domain=" + (i.domain) : "";
        var y = i.secure ? "; secure" : "";
        document.cookie = [x, "=", encodeURIComponent(p), u, n, r, y].join("")
    } else {
        var v = null;
        if (document.cookie && document.cookie != "") {
            var o = document.cookie.split(";");
            for (var q = 0; q < o.length; q++) {
                var w = jQuery.trim(o[q]);
                if (w.substring(0, x.length + 1) == (x + "=")) {
                    v = decodeURIComponent(w.substring(x.length + 1));
                    break
                }
            }
        }
        return v
    }
}
;
var common = {
    cookieChange: false,
    O2S: function(d) {
        var c = [];
        var a = "";
        if (Object.prototype.toString.apply(d) === "[object Array]") {
            for (var b = 0; b < d.length; b++) {
                c.push(O2String(d[b]))
            }
            a = "[" + c.join(",") + "]"
        } else {
            if (Object.prototype.toString.apply(d) === "[object Date]") {
                a = "new Date(" + d.getTime() + ")"
            } else {
                if (Object.prototype.toString.apply(d) === "[object RegExp]" || Object.prototype.toString.apply(d) === "[object Function]") {
                    a = d.toString()
                } else {
                    if (Object.prototype.toString.apply(d) === "[object Object]") {
                        for (var b in d) {
                            d[b] = typeof (d[b]) == "string" ? '"' + d[b] + '"' : (typeof (d[b]) === "object" ? O2String(d[b]) : d[b]);
                            c.push('"' + b + '":' + d[b])
                        }
                        a = "{" + c.join(",") + "}"
                    }
                }
            }
        }
        return a
    },
    S2O: function(S) {
        try {
            if (S) {
                var obj = eval("(" + S + ")");
                if (typeof (obj) === "object") {
                    return obj
                } else {
                    return false
                }
            } else {
                return false
            }
        } catch (e) {
            return false
        }
    },
    saveLog: function(a) {
        common.sendReq("http://www.atpanel.com/twz.2?" + $.param(a) + "&menupage=index");
        common.sendReq("http://krq.tao123.com/log.php?" + $.param(a) + "&menupage=index")
    },
    sendReq: function(a) {
        var b = parseInt((new Date().getTime()) * Math.random())
          , e = "log_" + b
          , d = window[e] = new Image();
        d.onload = (d.onerror = function() {
            window[e] = null
        }
        );
        d.src = a + "&t=" + b;
        d = null
    },
    showMask: function() {
        var a = '<div id="mask"><iframe frameborder="0"></iframe></div>';
        if ($("#mask").size() > 0) {
            $("#mask").show()
        } else {
            $("body").append(a)
        }
    },
    updateCache: function() {
        if (typeof (pageFlag) != "String") {
            pageFlag = "home"
        }
        if (pageFlag == "wb") {
            return
        }
        if (common.cookieChange) {
            common.cookieChange = false;
            setTimeout(function() {
                location.reload(true)
            }, 500)
        }
    }
};
function setHomepage(f, c) {
    var a = "/sethelp/";
    if (document.all) {
        try {
            document.body.style.behavior = "url(#default#homepage)";
            document.body.setHomePage(c)
        } catch (d) {
            try {
                f.style.behavior = "url(#default#homepage)";
                f.setHomePage(c)
            } catch (d) {
                window.open(a)
            }
        }
    } else {
        if (window.sidebar) {
            try {
                var b = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
                b.setCharPref("browser.startup.homepage", c);
                alert("\u8bbe\u7f6e\u6210\u529f")
            } catch (d) {
                window.open(a)
            }
        } else {
            window.open(a)
        }
    }
}
$(".set_hp").click(function(b) {
    var a = $(this).attr("data-seturl");
    if (!a) {
        a = "http://www.tao123.com"
    }
    if ($(this).attr("data-hidehp") == "1") {
        if ($.cookie("set_hp") != "1") {
            $.cookie("set_hp", "1", {
                expires: 1,
                path: "/",
                domain: ".tao123.com"
            })
        } else {
            return true
        }
    }
    setHomepage(b, a);
    return false
});
$("body").click(function(g) {
    var c = $(g.target);
    if (c.closest("#stw").size() < 1 && $("#stw").is(":visible")) {
        $("#stw").hide()
    }
    if (c.closest(".cstkh").size() < 1 && $(".cstkhh").is(":visible")) {
        $(".cstkhh,.cstk").hide();
        common.saveLog({
            name: "\u6536\u8d77\u80a1\u7968",
            position: "menu"
        })
    }
    if (c.closest(".csnm").size() < 1 && $(".csmyt").is(":visible")) {
        $(".csmyt,.csmy").hide();
        common.saveLog({
            name: "\u6536\u8d77\u6211\u7684\u5bfc\u822a",
            position: "menu"
        })
    }
    if (c.closest("#sbwl").size() < 1 && $(".sbws").is(":visible")) {
        $(".sbws").hide();
        $("#sbwl").removeClass("sblf")
    }
    if (c.closest(".cstb").size() < 1 && c.closest(".csth").size() < 1 && $(".cstb").is(":visible")) {
        $(".csthh,.cstb").hide();
        common.saveLog({
            name: "\u6536\u8d77\u5de5\u5177",
            position: "menu"
        })
    }
    if (c.closest("a").size() > 0) {
        var d = c.closest("a")
          , b = ""
          , i = d.attr("l-r") ? d.attr("l-r") : d.text()
          , f = "";
        if (d.closest("[l]").size() > 0) {
            b = d.closest("[l]").attr("l")
        }
        if (d.closest("[l-sub]").attr("l-sub") == "1") {
            f = "sub"
        }
        common.saveLog({
            name: i,
            position: b,
            sub: f
        })
    }
});
$(function() {
    var a = window.dataMail;
    $(".hmm").change(function() {
        var e = $(this)
          , j = e.val()
          , g = $.cookie("login_acct_log")
          , i = $(".hmlk")
          , d = $(".hmipt");
        if (j < 90) {
            if (d.hasClass("c_h")) {
                i.addClass("c_h");
                d.removeClass("c_h")
            }
            if (g) {
                var f = common.S2O(g);
                if (f[j]) {
                    $(".hma").val(f[j]);
                    $(".hmp").focus()
                } else {
                    $(".hma").val("").focus()
                }
            } else {
                $(".hma").val("").focus()
            }
        } else {
            if (j > 90) {
                if (i.hasClass("c_h")) {
                    d.addClass("c_h");
                    i.removeClass("c_h")
                }
                i.text("\u767b\u5f55 " + e.find("option:selected").text());
                window.open(a[j].action);
                c(j);
                common.saveLog({
                    name: $(".hmlk").text(),
                    position: "header"
                })
            }
        }
    });
    $("#mail").submit(function() {
        var j = $(".hmm").val();
        var i = b(a[j]["params"], function(k) {
            return k.replace("#{u}", $(".hma").val()).replace("#{p}", $(".hmp").val())
        });
        $(".hmp").val("");
        var g = "<div style='position:absolute;left:-9999px;top:-9999px'><form id='tempForm' action='" + a[j]["action"] + "' method='post'>";
        for (var f in i) {
            g += "<input name='" + f + "' value='" + i[f] + "'/>"
        }
        g += "</form><div>";
        $("body").append(g);
        $("#tempForm").submit().parent().remove();
        var e = $.cookie("login_acct_log");
        var d = common.S2O(e);
        if (d == false) {
            d = {}
        }
        d[j] = $(".hma").val();
        $.cookie("login_acct_log", common.O2S(d), {
            expires: 365,
            path: "/",
            domain: ".tao123.com"
        });
        c(j);
        common.saveLog({
            name: "\u767b\u5f55 " + $(".hmm").find("option:selected").text(),
            position: "header"
        });
        common.cookieChange = true;
        common.updateCache();
        return false
    });
    function c(d) {
        $.cookie("login_last", d, {
            expires: 365,
            path: "/",
            domain: ".tao123.com"
        })
    }
    function b(e, g) {
        var d = {};
        for (var f in e) {
            d[f] = g ? g(e[f]) : e[f]
        }
        return d
    }
});
$(function() {
    function c(d) {
        $.getScript("http://weather.tao123.com/static/weather/search_city.php?code=" + d + "&t=" + (new Date).getTime(), function() {
            if (wdata[0] == "end") {
                a(d, 1);
                $("#stw").hide();
                return
            }
            var e = [];
            $.each(wdata, function(g) {
                e[g] = '<li><span code="' + this.match(/\d+/) + '">' + this.match(/[^\d]+/) + "</span></li>"
            });
            $("#ttw strong").html(wcity);
            var f = $("#ttw .stwback");
            if (d != "") {
                f.html("\u8fd4\u56de");
                if (d.length > 2) {
                    f.attr("code", d.substring(0, 2))
                } else {
                    f.attr("code", "")
                }
            } else {
                f.html("").attr("code", "")
            }
            $("#cntw").empty().html(e.join(""));
            $("#stw").show().find("span").unbind().click(function() {
                if ($(this).hasClass("stwclose")) {
                    $("#stw").hide();
                    return false
                }
                if ($(this).hasClass("stwip")) {
                    $("#stw").hide();
                    a("", 2);
                    return false
                }
                c($(this).attr("code"))
            })
        })
    }
    function b() {
        var d = $.cookie("weather_cache")
          , e = "";
        if (d) {
            var f = common.S2O(d);
            if (f.save == 1) {
                e = f.code
            }
        }
    }
    b();
    setInterval(function() {
        b()
    }, 3600000);
    $("#hws").live("click", function() {
        c("");
        return false
    })
});
$(function() {
    var a = new Date();
    setTimeout(function() {
        window.serverTime += 1000;
        a.setTime(window.serverTime);
        h = a.getHours();
        m = a.getMinutes();
        s = a.getSeconds();
        $(".hdt").html((h < 10 ? "0" + h : h) + '<span class="hdtd">:</span>' + (m < 10 ? "0" + m : m) + '<span class="hdts">' + (s < 10 ? "0" + s : s) + "</span>");
        delete h;
        delete m;
        delete s;
        setTimeout(arguments.callee, 1000)
    }, 1000)
});
$(function() {
    $(".stm").mouseover(function() {
        $(".stml").show()
    }).mouseout(function() {
        $(".stml").hide()
    });
    var c = $("#sts>a")
      , f = $("#q")
      , b = $("#sbww")
      , e = $("#sbwp")
      , i = $("#sbwl")
      , g = $(".sbws");
    if (navigator.userAgent.match(/MSIE 7.0/) || navigator.userAgent.match(/MSIE 8.0/)) {
        setTimeout(function() {
            f.select()
        }, 1)
    } else {
        f.focus()
    }
    c.click(function(o) {
        var l = $(this)
          , j = !l.hasClass("stc") || l.hasClass("stn");
        c.removeClass("stc");
        l.addClass("stc");
        if (dataNews.tabkeyword) {
            d(l.attr("data-type"))
        } else {
            var k = $("head")[0] || document.documentElement
              , n = document.createElement("script");
            n.src = "http://www.tao123.com/afterload.json.php?callback=afterload&t=" + (new Date).getTime();
            n.charset = "gbk";
            n.async = true;
            k.insertBefore(n, k.firstChild)
        }
        a();
        if (j) {
            o.preventDefault()
        }
    });
    i.click(function(o) {
        if (!$(this).hasClass("sblo")) {
            var l = $(".stc").attr("data-type")
              , n = $("#sbwf")
              , k = n.attr("data-engine")
              , p = dataSearch[l]
              , j = "";
            $.each(p, function(r, q) {
                if (r != k) {
                    j += '<a href="javascript:;" data-engine="' + r + '" hidefocus="true"><img src="' + dataUrls.searchImg + q.img + '"></a>'
                }
            });
            g.html(j).toggle();
            $(this).toggleClass("sblf");
            o.preventDefault()
        }
    });
    g.find("a").live("click", function(l) {
        var n = $(this).attr("data-engine");
        $("#sbwf").attr("data-engine", n);
        if ($(".stc").attr("data-type") == "page") {
            d("page")
        }
        var k = dataSearch.more[n];
        if (k) {
            var j = "";
            $.each(k, function() {
                j += '<a href="' + this["url"] + '">' + this["text"] + "</a>"
            });
            $(".stml").html(j)
        }
        a();
        l.preventDefault();
        $.cookie("engine", n, {
            expires: 1000,
            path: "/",
            domain: ".tao123.com"
        });
        common.cookieChange = true
    });
    window.afterload = function(j) {
        dataNews = j;
        window.serverTime = parseInt(j.servertime);
        d($(".stc").attr("data-type"))
    }
    ;
    $("#sbwf").submit(function() {
        var j = $(this).attr("data-engine");
        common.sendReq("http://www.atpanel.com/twz.2.6?q=" + encodeURIComponent($.trim($("#q").val())) + "&search_type=" + $(".stc").attr("data-type") + "&engine=" + j);
        common.sendReq("http://krq.tao123.com/gsearch.php?q=" + encodeURIComponent($.trim($("#q").val())) + "&search_type=" + $(".stc").attr("data-type") + "&engine=" + j);
        if ($.trim($("#q").val()) == "" && j == "sogou" && $(".stc").attr("data-type") == "page") {
            window.open("http://www.sogou.com/index.php?pid=sogou-netb-987797582-20141020");
            return false
        }
        common.updateCache()
    });
    $("#sbtf").submit(function() {
        common.sendReq("http://www.atpanel.com/twz.2.6?q=" + encodeURIComponent($.trim($("#t").val())) + "&search_type=page&engine=taobao");
        common.sendReq("http://krq.tao123.com/gsearch.php?q=" + encodeURIComponent($.trim($("#t").val())) + "&search_type=page&engine=taobao")
    });
    function a() {
        var o = $(".stc").attr("data-type")
          , q = $("#sbwf")
          , n = q.attr("data-engine")
          , k = dataSearch[o][n]
          , l = dataSearch.spread[n];
        html = "";
        if (k == undefined) {
            var t;
            for (var j in dataSearch[o]) {
                if (dataSearch[o].hasOwnProperty(j) && typeof (j) !== "function") {
                    t = dataSearch[o][j];
                    break
                }
            }
            k = t;
            i.addClass("sblo").attr("href", k.url)
        } else {
            i.removeClass("sblo")
        }
        i.find("img").attr("src", dataUrls.searchImg + k.img);
        q.attr("action", k.action).find("#q").attr("name", k.name).attr("data-sug", dataSearch.sug[o]);
        if (k.params) {
            $.each(k.params, function(u, r) {
                html += '<input type="hidden" name="' + u + '" value="' + r + '">'
            })
        }
        if (l && k.spread != "off") {
            $.each(l, function(u, r) {
                html += '<input type="hidden" name="' + u + '" value="' + r + '">'
            })
        }
        e.html(html);
        f.focus();
        if ($.browser.msie) {
            var p = f[0].createTextRange();
            p.collapse(false);
            p.select()
        }
    }
    function d(n) {
        var j = "";
        if (n == "page") {
            var p = $("#sbwf")
              , l = p.attr("data-engine")
              , k = dataSearch.spread[l]
              , o = dataSearch.page[l]["action"] + "?";
            if (k) {
                $.each(k, function(r, q) {
                    o += r + "=" + q + "&"
                })
            }
            o += dataSearch.page[l]["name"] + "=";
            $.each(dataNews.newskeyword, function() {
                var q = this["class"] == "notify" ? ' class="c_hl"' : "";
                j += '<a href="' + o + this["stext"] + '"' + q + ">" + this["text"] + "</a>"
            });
            j += '<a href="http://www.sogou.com/index.htm?pid=sogou-netb-987797582-20141020">\u66f4\u591a &raquo;</a>';
            b.html(j)
        } else {
            $.each(dataNews.tabkeyword[n]["line1"], function() {
                var q = this["class"] == "notify" ? ' class="c_hl"' : "";
                j += '<a href="' + this["url"] + '"' + q + ">" + this["text"] + "</a>"
            });
            b.html(j)
        }
    }
});
$(function() {
    var a = $("#sg")
      , d = false;
    $("#q,#t").keyup(function(j) {
        if (j.keyCode == 40 && $("#sg li").size()) {
            var g = $("#sg .cur");
            if (g.size() && g.next().size()) {
                g.next().addClass("cur")
            } else {
                $("#sg li:first").addClass("cur")
            }
            g.removeClass("cur");
            $(this).val($("#sg .cur").html().replace(/<span>.*<\/span>/i, ""));
            return false
        }
        if (j.keyCode == 38 && $("#sg li").size()) {
            var g = $("#sg .cur");
            if (g.size() && g.prev().size()) {
                g.prev().addClass("cur")
            } else {
                $("#sg li:last").addClass("cur")
            }
            g.removeClass("cur");
            $(this).val($("#sg .cur").html().replace(/<span>.*<\/span>/i, ""));
            return false
        }
        if ($.trim($(this).val()) != "") {
            if (this.id == "t") {
                var f = dataSearch.sug["taobao"];
                f = f.replace("q=", "q=" + encodeURIComponent($(this).val()));
                b(f, "utf-8")
            } else {
                var i = $(".stc").attr("data-type");
                url = dataSearch.sug[i];
                f = url.replace("wd=", "wd=" + encodeURIComponent($.trim($(this).val())));
                if (i == "map") {
                    b(f, "utf-8")
                } else {
                    if (i == "video") {
                        f = url.replace("q=", "q=" + encodeURIComponent($.trim($(this).val())));
                        $.getScript(f)
                    } else {
                        $.getScript(f)
                    }
                }
            }
        } else {
            $("#sg").hide()
        }
    }).blur(function() {
        a.hide()
    }).bind("beforedeactivate", function() {
        if (d) {
            return false
        }
    });
    function b(f, g) {
        var e = document.createElement("script");
        e.type = "text/javascript";
        e.charset = g;
        e.src = f;
        e.async = true;
        document.body.appendChild(e)
    }
    window.baidu = {};
    window.baidu.sug = function(f) {
        if (f.s.length > 0) {
            var e = "";
            $.each(f.s, function() {
                e += "<li>" + this + "</li>"
            });
            a.removeAttr("style").html(e).show();
            c($("#q"))
        } else {
            a.hide()
        }
    }
    ;
    window.baidu.sugmap = function(f) {
        if (f.s.length > 0) {
            var e = "";
            $.each(f.s, function() {
                var g = this.replace(/\$\$/g, "$").split("$");
                e += "<li>" + g[g.length - 3] + "</li>"
            });
            a.removeAttr("style").html(e).show();
            c($("#q"))
        } else {
            a.hide()
        }
    }
    ;
    window.tspsug = function(f) {
        if (f.r.length > 0) {
            var e = "";
            $.each(f.r, function() {
                e += "<li>" + this["val"] + "</li>"
            });
            a.removeAttr("style").html(e).show();
            c($("#q"))
        } else {
            a.hide()
        }
    }
    ;
    window.sugtaobao = function(f) {
        if (f.result.length > 0) {
            var e = "";
            $.each(f.result, function(g, j) {
                if (j) {
                    e += "<li><span>\u7ea6 " + j[1] + " \u4e2a\u5b9d\u8d1d</span>" + j[0] + "</li>"
                }
            });
            a.css("top", 70).html(e).show();
            c($("#t"))
        } else {
            a.hide()
        }
    }
    ;
    function c(e) {
        $("#sg").hover(function() {
            d = true
        }, function() {
            d = false
        });
        $("#sg li").hover(function() {
            $(this).addClass("cur")
        }, function() {
            $(this).removeClass("cur")
        }).mousedown(function(f) {
            return false
        }).click(function() {
            e.val($(this).html().replace(/<span>.*<\/span>/i, "")).focus().closest("form").submit();
            $("#sg").hide()
        })
    }
});
$(function() {
    var e = $("#csmmi")
      , l = /^\d{11,11}$/
      , b = "http://www.alimama.com/chongzhi/phone_search.do?callback=getTKCity&phone="
      , i = "http://www.alimama.com/chongzhi/phone_card.do?callback=getTKUrl&"
      , f = $(".csmmt")
      , c = $("#csmmf")
      , j = c.find("select")
      , k = "mm_16775128_4294185_14492770"
      , g = ""
      , d = "";
    function a() {
        g = "";
        var n = $.trim(e.val());
        l.lastIndex = 0;
        if (l.test(n)) {
            $.getScript(b + n)
        }
    }
    window.getTKCity = function(n) {
        if (n.success) {
            d = n.province_name + "\u3000" + n.cat_name;
            f.text(d).addClass("c_hl");
            var o = {
                cat_id: n.cat_id,
                price_id: j.val(),
                province_id: n.province_id,
                mm_id: k,
                phone: n.phone
            };
            $.getScript(i + $.param(o))
        } else {
            f.text("\u8bf7\u586b\u5199\u6b63\u786e\u624b\u673a\u53f7").addClass("c_hl")
        }
    }
    ;
    window.getTKUrl = function(n) {
        f.text(d + "\u3000" + n.price + "\u5143").addClass("c_hl");
        g = n.click_url
    }
    ;
    c.bind("submit", function() {
        var n = $.trim(e.val());
        l.lastIndex = 0;
        if (!l.test(n) || g == "") {
            f.text("\u8bf7\u586b\u5199\u6b63\u786e\u624b\u673a\u53f7").addClass("c_hl");
            e.select()
        } else {
            window.open(g);
            common.saveLog({
                name: "\u624b\u673a\u5145\u503c"
            })
        }
        return false
    });
    e.bind("propertychange", a);
    e.bind("input", a);
    j.bind("change", a)
});
$(function() {
    $(".fsw").click(function(a) {
        var b = $(this).parent().find(".fs:visible");
        if (b.next(".fs").size() > 0) {
            b.hide().next(".fs").show()
        } else {
            b.hide().siblings(".fs:first").show()
        }
        a.preventDefault()
    })
});
$(function() {
    $(".hdjr").click(function() {
        var a = $(this).next();
        $.getJSON("http://weather.tao123.com/shenghuo/xiaohua/json_api.php?callback=?&id=" + a.attr("href").split("#")[1], function(b) {
            a.attr("href", a.attr("href").split("#")[0] + "#" + b.id).text("\u7b11\u8bdd\uff1a" + b.title.substring(0, 9)).attr("title", b.title)
        });
        common.saveLog({
            name: "\u6362\u4e00\u6761\u7b11\u8bdd",
            position: "header"
        })
    })
});
$(function() {
    $("#change_skin").click(function() {
        common.showMask();
        if ($("#skin_box").size() < 1) {
            var b = "";
            if (window.parent != window) {
                b = 'style="top:25%" '
            }
            var a = "<iframe " + b + 'scrolling="no" id="skin_box" src="http://www.tao123.com/mania/skin.php?' + (new Date).getTime() + '" frameborder="0"></iframe>';
            $("body").append(a)
        } else {
            $("#skin_box").show()
        }
        common.saveLog({
            name: "\u6362\u80a4",
            position: "top"
        });
        return false
    })
});
$(function() {
    var a = $(".csthh")
      , b = $(".cstb");
    $(".csth").click(function() {
        a.add(b).show();
        common.saveLog({
            name: "\u5c55\u5f00\u5de5\u5177",
            position: "menu"
        })
    });
    if ($.cookie("h_tip")) {
        $.cookie("h_tip", null, {
            domain: ".tao123.com"
        })
    }
});
$(function() {
    $(".cstkh").click(function() {
        $(".cstkhh").show();
        var a = $("textarea.cstk");
        if (a.size() > 0) {
            a.after(a.text());
            a.remove()
        } else {
            $(".cstk").show()
        }
        common.saveLog({
            name: "\u5c55\u5f00\u80a1\u7968",
            position: "menu"
        })
    })
});
$(function() {
    $(".csnm").click(function() {
        $(".csmyt").show();
        var a = $("textarea.csmy");
        if (a.size() > 0) {
            a.after(a.text());
            a.remove()
        } else {
            $(".csmy").show()
        }
        common.saveLog({
            name: "\u5c55\u5f00\u6211\u7684\u5bfc\u822a",
            position: "menu"
        })
    })
});
$(function() {
    $("body").click(function(g) {
        var c = $(g.target).closest("a");
        if (c.size() > 0 && c.children().size() == 0 && (c.attr("href").substring(0, 4) == "http" || c.attr("href").substring(0, 1) == "/")) {
            var f = c.attr("href") + ",," + c.text().substring(0, 6) + ";;", b = $.cookie("bookmark_history"), d;
            if (b) {
                d = b.indexOf(f);
                if (d !== -1) {
                    b = b.slice(0, d) + b.slice(d + f.length, b.length)
                }
                b = f + b;
                if (b.split(";;").length > 12) {
                    b = b.split(";;").slice(0, 12).join(";;") + ";;"
                }
            } else {
                b = f
            }
            $.cookie("bookmark_history", b, {
                expires: 1000,
                path: "/",
                domain: ".tao123.com"
            });
            a(b)
        }
    });
    function a(f) {
        try {
            var b = $(window.my_nav.document).find("#J_navigator")
        } catch (g) {
            var b = null
        }
        if (b) {
            var j = b.find("p:first"), c, d = "";
            if (!f) {
                return
            }
            f = f.slice(0, f.length - 2).split(";;");
            for (c in f) {
                c = f[c].split(",,");
                d += '<li><a href="' + c[0] + '"><span title="' + c[1] + '">' + c[1] + '</span><b title="\u6dfb\u52a0\u5230\u6211\u7684\u5bfc\u822a"></b></a></li>'
            }
            if (d) {
                j.hide()
            } else {
                j.show()
            }
            b.find("#J_history").html(d)
        }
    }
});
$(function() {
    $(".openWin").click(function(b) {
        var a = $(this);
        window.open(a.attr("href"), "", "width=" + a.attr("data-width") + ",height=" + a.attr("data-height") + ",left=" + (screen.width - a.attr("data-width")) / 2 + ",top=" + ((screen.height - a.attr("data-height")) / 2 - 70));
        b.preventDefault()
    })
});


(->
  J = (a) ->
    M.call(a) == "[object Function]"
  E = (a) ->
    M.call(a) == "[object Array]"
  Z = (a, c, h) ->
    for k of c
      a[k] = c[k]  if not (k of K) and (not (k of a) or h)
    d
  N = (a, c, d) ->
    a = Error(c + "\nhttp://requirejs.org/docs/errors.html#" + a)
    a.originalError = d  if d
    a
  $ = (a, c, d) ->
    k = 0
    while q = c[k]
      q = (if typeof q == "string" then name: q else q)
      j = q.location
      j = d + "/" + (j or q.name)  if d and (not j or j.indexOf("/") != 0 and j.indexOf(":") == -1)
      a[q.name] = 
        name: q.name
        location: j or q.name
        main: (q.main or "main").replace(ea, "").replace(aa, "")
      k++
  V = (a, c) ->
    (if a.holdReady then a.holdReady(c) else (if c then a.readyWait += 1 else a.ready(not 0)))
  fa = (a) ->
    c = (b, l) ->
      if b and b.charAt(0) == "."
        if l
          (if p.pkgs[l] then l = [ l ] else (l = l.split("/")
          l = l.slice(0, l.length - 1)
          ))
          f = b = l.concat(b.split("/"))
          
          a = 0
          while c = f[a]
            if c == "."
              f.splice(a, 1)
              a -= 1
            else if c == ".."
              if a == 1 and (f[2] == ".." or f[0] == "..")
                break
              else
                a > 0 and (f.splice(a - 1, 2)
                a -= 2
                )
            a++
          a = p.pkgs[f = b[0]]
          b = b.join("/")
          a and b == f + "/" + a.main and (b = f)
        else
          b.indexOf("./") == 0 and (b = b.substring(2))
      b
    h = (b, l) ->
      f = (if b then b.indexOf("!") else -1)
      a = null
      d = (if l then l.name else null)
      i = b
      f != -1 and (a = b.substring(0, f)
      b = b.substring(f + 1, b.length)
      )
      a and (a = c(a, d))
      b and (if a then e = (if (f = m[a]) and f.normalize then f.normalize(b, (b) ->
        c b, d
      ) else c(b, d)) else (e = c(b, d)
      h = E[e]
      h or (h = g.nameToUrl(e, null, l)
      E[e] = h
      )
      ))
      prefix: a
      name: e
      parentMap: l
      url: h
      originalName: i
      fullName: (if a then a + "!" + (e or "") else e)
    k = ->
      b = not 0
      l = p.priorityWait
      if l
        a = 0
        while f = l[a]
          unless s[f]
            b = not 1
            break
          a++
        b and delete p.priorityWait
      b
    j = (b, l, f) ->
      ->
        a = ga.call(arguments, 0)
        c.__requireJsBuild = not 0  if f and J(c = a[a.length - 1])
        a.push l
        b.apply null, a
    q = (b, l) ->
      a = j(g.require, b, l)
      Z a, 
        nameToUrl: j(g.nameToUrl, b)
        toUrl: j(g.toUrl, b)
        defined: j(g.requireDefined, b)
        specified: j(g.requireSpecified, b)
        isBrowser: d.isBrowser
      
      a
    o = (b) ->
      C = b.callback
      i = b.map
      e = i.fullName
      ba = b.deps
      c = b.listeners
      if C and J(C)
        if p.catchError.define
          try
            a = d.execCb(e, b.callback, ba, m[e])
          catch k
            l = k
        else
          a = d.execCb(e, b.callback, ba, m[e])
        if e
          (if (C = b.cjsModule) and C.exports != undefined and C.exports != m[e] then a = m[e] = b.cjsModule.exports else (if a == undefined and b.usingExports then a = m[e] else (m[e] = a
          F[e] and (Q[e] = not 0)
          )))
      else
        e and (a = m[e] = C
        F[e] and (Q[e] = not 0)
        )
      if D[b.id]
        delete D[b.id]
        
        b.isDone = not 0
        g.waitCount -= 1
        g.waitCount == 0 and (I = [])
      delete R[e]
      
      d.onResourceLoad g, i, b.depArray  if d.onResourceLoad and not b.placeholder
      if l
        return a = (if e then h(e).url else "") or l.fileName or l.sourceURL
        c = l.moduleTree
        l = N("defineerror", "Error evaluating module \"" + e + "\" at location \"" + a + "\":\n" + l + "\nfileName:" + a + "\nlineNumber: " + (l.lineNumber or l.line), l)
        l.moduleName = e
        l.moduleTree = c
        d.onError(l)
      l = 0
      while C = c[l]
        C a
        l++
    r = (b, a) ->
      (f) ->
        b.depDone[a] or (b.depDone[a] = not 0
        b.deps[a] = f
        b.depCount -= 1
        b.depCount or o(b)
        )
    u = (b, a) ->
      f = a.map
      c = f.fullName
      h = f.name
      i = L[b] or (L[b] = m[b])
      unless a.loading
        a.loading = not 0
        e = (b) ->
          a.callback = ->
            b
          
          o a
          s[a.id] = not 0
          w()
        
        e.fromText = (b, a) ->
          l = O
          s[b] = not 1
          g.scriptCount += 1
          g.fake[b] = not 0
          l and (O = not 1)
          d.exec a
          l and (O = not 0)
          g.completeLoad b
        
        (if c of m then e(m[c]) else i.load(h, q(f.parentMap, not 0), e, p))
    v = (b) ->
      D[b.id] or (D[b.id] = b
      I.push(b)
      g.waitCount += 1
      )
    B = (b) ->
      @listeners.push b
    t = (b, a) ->
      f = b.fullName
      c = b.prefix
      d = (if c then L[c] or (L[c] = m[c]) else null)
      f and (i = R[f])
      R[f] = i  if not i and (e = not 0
      i = 
        id: (if c and not d then M++ + "__p@:" else "") + (f or "__r@" + M++)
        map: b
        depCount: 0
        depDone: []
        depCallbacks: []
        deps: []
        listeners: []
        add: B
      
      y[i.id] = not 0
      f and (not c or L[c])
      )
      (if c and not d then (f = t(h(c), not 0)
      f.add(->
        a = h(b.originalName, b.parentMap)
        a = t(a, not 0)
        i.placeholder = not 0
        a.add (b) ->
          i.callback = ->
            b
          
          o i
      )
      ) else e and a and (s[i.id] = not 1
      g.paused.push(i)
      v(i)
      ))
      i
    x = (b, a, f, c) ->
      b = h(b, c)
      d = b.name
      i = b.fullName
      e = t(b)
      k = e.id
      j = e.deps
      if i
        return  if i of m or s[k] == not 0 or i == "jquery" and p.jQuery and p.jQuery != f().fn.jquery
        y[k] = not 0
        s[k] = not 0
        i == "jquery" and f and S(f())
      e.depArray = a
      e.callback = f
      f = 0
      while f < a.length
        if k = a[f]
          k = h(k, (if d then b else c))
          n = k.fullName
          a[f] = n
          (if n == "require" then j[f] = q(b) else (if n == "exports" then (j[f] = m[i] = {}
          e.usingExports = not 0
          ) else (if n == "module" then e.cjsModule = j[f] = 
            id: d
            uri: (if d then g.nameToUrl(d, null, c) else undefined)
            exports: m[i]
           else (if n of m and not (n of D) and (not (i of F) or i of F and Q[n]) then j[f] = m[n] else (i of F and (F[n] = not 0
          delete m[n]
          
          T[k.url] = not 1
          )
          e.depCount += 1
          e.depCallbacks[f] = r(e, f)
          t(k, not 0).add(e.depCallbacks[f])
          )))))
        f++
      (if e.depCount then v(e) else o(e))
    n = (b) ->
      x.apply null, b
    z = (b, a) ->
      unless b.isDone
        c = b.map.fullName
        d = b.depArray
        if c
          return m[c]  if a[c]
          a[c] = not 0
        if d
          g = 0
          while g < d.length
            if i = d[g]
              if (e = h(i).prefix) and (k = D[e]) and z(k, a)
              (e = D[i]) and not e.isDone and s[i]
                i = z(e, a)
                b.depCallbacks[g](i)
            g++
        (if c then m[c] else undefined)
    A = ->
      b = p.waitSeconds * 1E3
      a = b and g.startTime + b < (new Date).getTime()
      b = ""
      c = not 1
      h = not 1
      unless (g.pausedCount > 0)
        if p.priorityWait
          if k()
            w()
          else
            return
        for j of s
          if not (j of K) and (c = not 0
          not s[j]
          )
            if a
              b += j + " "
            else
              h = not 0
              break
        if c or g.waitCount
          if a and b
            return j = N("timeout", "Load timeout for modules: " + b)
            j.requireType = "timeout"
            j.requireModules = b
            d.onError(j)
          if h or g.scriptCount
            if (G or ca) and not W
              W = setTimeout(->
                W = 0
                A()
              , 50)
          else
            if g.waitCount
              H = 0
              while b = I[H]
                z b, {}
                H++
              g.paused.length and w()
              X < 5 and (X += 1
              A()
              )
            X = 0
            d.checkReadyState()
    p = 
      waitSeconds: 7
      baseUrl: "./"
      paths: {}
      pkgs: {}
      catchError: {}
    
    P = []
    y = 
      require: not 0
      exports: not 0
      module: not 0
    
    E = {}
    m = {}
    s = {}
    D = {}
    I = []
    T = {}
    M = 0
    R = {}
    L = {}
    F = {}
    Q = {}
    Y = 0
    S = (b) ->
      if not g.jQuery and (b = b or (if typeof jQuery != "undefined" then jQuery else null)) and not (p.jQuery and b.fn.jquery != p.jQuery) and ("holdReady" of b or "readyWait" of b)
        if g.jQuery = b
        n([ "jquery", [], ->
          jQuery
         ])
        g.scriptCount
          V(b, not 0)
          g.jQueryIncremented = not 0
    
    w = ->
      Y += 1
      g.scriptCount = 0  if g.scriptCount <= 0
      while P.length
        if b = P.shift()
        b[0] == null
          return d.onError(N("mismatch", "Mismatched anonymous define() module: " + b[b.length - 1]))
        else
          n b
      if not p.priorityWait or k()
        while g.paused.length
          j = g.paused
          g.pausedCount += j.length
          g.paused = []
          h = 0
          while b = j[h]
            a = b.map
            c = a.url
            i = a.fullName
            (if a.prefix then u(a.prefix, b) else not T[c] and not s[i] and (d.load(g, i, c)
            c.indexOf("empty:") != 0 and (T[c] = not 0)
            ))
            h++
          g.startTime = (new Date).getTime()
          g.pausedCount -= j.length
      Y == 1 and A()
      Y -= 1
    
    g = 
      contextName: a
      config: p
      defQueue: P
      waiting: D
      waitCount: 0
      specified: y
      loaded: s
      urlMap: E
      urlFetched: T
      scriptCount: 0
      defined: m
      paused: []
      pausedCount: 0
      plugins: L
      needFullExec: F
      fake: {}
      fullExec: Q
      managerCallbacks: R
      makeModuleMap: h
      normalize: c
      configure: (b) ->
        b.baseUrl and b.baseUrl.charAt(b.baseUrl.length - 1) != "/" and (b.baseUrl += "/")
        a = p.paths
        d = p.pkgs
        Z p, b, not 0
        if b.paths
          for c of b.paths
            c of K or (a[c] = b.paths[c])
          p.paths = a
        if (a = b.packagePaths) or b.packages
          if a
            for c of a
              c of K or $(d, a[c], c)
          b.packages and $(d, b.packages)
          p.pkgs = d
        if b.priority
          c = g.requireWait
          g.requireWait = not 1
          g.takeGlobalQueue()
          w()
          g.require(b.priority)
          w()
          g.requireWait = c
          p.priorityWait = b.priority
        g.require b.deps or [], b.callback  if b.deps or b.callback
      
      requireDefined: (b, a) ->
        h(b, a).fullName of m
      
      requireSpecified: (b, a) ->
        h(b, a).fullName of y
      
      require: (b, c, f) ->
        if typeof b == "string"
          return d.onError(N("requireargs", "Invalid require call"))  if J(c)
          return d.get(g, b, c)  if d.get
          c = h(b, c)
          b = c.fullName
          return (if not (b of m) then d.onError(N("notloaded", "Module name '" + c.fullName + "' has not been loaded yet for context: " + a)) else m[b])
        (b and b.length or c) and x(null, b, c, f)
        unless g.requireWait
          while not g.scriptCount and g.paused.length
            g.takeGlobalQueue()
            w()
        g.require
      
      takeGlobalQueue: ->
        U.length and (ha.apply(g.defQueue, [ g.defQueue.length - 1, 0 ].concat(U))
        U = []
        )
      
      completeLoad: (b) ->
        g.takeGlobalQueue()
        while P.length
          if a = P.shift()
          a[0] == null
            a[0] = b
            break
          else if a[0] == b
            break
          else
            n(a)
            a = null
        (if a then n(a) else n([ b, [], (if b == "jquery" and typeof jQuery != "undefined" then ->
          jQuery
         else null) ]))
        S()
        d.isAsync and (g.scriptCount -= 1)
        w()
        d.isAsync or (g.scriptCount -= 1)
      
      toUrl: (a, c) ->
        d = a.lastIndexOf(".")
        h = null
        d != -1 and (h = a.substring(d, a.length)
        a = a.substring(0, d)
        )
        g.nameToUrl a, h, c
      
      nameToUrl: (a, h, f) ->
        m = g.config
        a = c(a, f and f.fullName)
        if d.jsExtRegExp.test(a)
          h = a + (if h then h else "")
        else
          j = m.paths
          k = m.pkgs
          f = a.split("/")
          e = f.length
          while e > 0
            if i = f.slice(0, e).join("/")
            j[i]
              f.splice 0, e, j[i]
              break
            else if i = k[i]
              a = (if a == i.name then i.location + "/" + i.main else i.location)
              f.splice 0, e, a
              break
            e--
          h = f.join("/") + (h or ".js")
          h = (if h.charAt(0) == "/" or h.match(/^\w+:/) then "" else m.baseUrl) + h
        (if m.urlArgs then h + ((if h.indexOf("?") == -1 then "?" else "&") + m.urlArgs) else h)
    
    g.jQueryCheck = S
    g.resume = w
    g
  ia = ->
    return n  if n and n.readyState == "interactive"
    a = document.getElementsByTagName("script")
    c = a.length - 1
    while c > -1 and (d = a[c])
      return n = d  if d.readyState == "interactive"
      c--
    null
  ja = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/g
  ka = /require\(\s*["']([^'"\s]+)["']\s*\)/g
  ea = /^\.\//
  aa = /\.js$/
  M = Object::toString
  r = Array::
  ga = r.slice
  ha = r.splice
  G = not not (typeof window != "undefined" and navigator and document)
  ca = not G and typeof importScripts != "undefined"
  la = (if G and navigator.platform == "PLAYSTATION 3" then /^complete$/ else /^(complete|loaded)$/)
  da = typeof opera != "undefined" and opera.toString() == "[object Opera]"
  K = {}
  t = {}
  U = []
  n = null
  X = 0
  O = not 1
  r = {}
  if typeof define == "undefined"
    if typeof requirejs != "undefined"
      if J(requirejs)
        return
      else
        r = requirejs
        requirejs = undefined
    typeof require != "undefined" and not J(require) and (r = require
    require = undefined
    )
    d = requirejs = (a, c, d) ->
      k = "_"
      not E(a) and typeof a != "string" and (j = a
      (if E(c) then (a = c
      c = d
      ) else a = [])
      )
      k = j.context  if j and j.context
      d = t[k] or (t[k] = fa(k))
      j and d.configure(j)
      d.require a, c
    
    d.config = (a) ->
      d a
    
    require or (require = d)
    d.toUrl = (a) ->
      t._.toUrl a
    
    d.version = "1.0.2"
    d.jsExtRegExp = /^\/|:|\?|\.js$/
    v = d.s = 
      contexts: t
      skipAsync: {}
    
    if d.isAsync = d.isBrowser = G
      x = v.head = y.parentNode  if x = v.head = document.getElementsByTagName("head")[0]
      y = document.getElementsByTagName("base")[0]
    d.onError = (a) ->
      throw a
    
    d.load = (a, c, h) ->
      d.resourcesReady not 1
      a.scriptCount += 1
      d.attach h, a, c
      if a.jQuery and not a.jQueryIncremented
        V(a.jQuery, not 0)
        a.jQueryIncremented = not 0
    
    define = (a, c, d) ->
      typeof a != "string" and (d = c
      c = a
      a = null
      )
      E(c) or (d = c
      c = []
      )
      not c.length and J(d) and d.length and (d.toString().replace(ja, "").replace(ka, (a, d) ->
        c.push d
      )
      c = (if d.length == 1 then [ "require" ] else [ "require", "exports", "module" ]).concat(c)
      )
      if O and (k = I or ia())
        a or (a = k.getAttribute("data-requiremodule"))
        j = t[k.getAttribute("data-requirecontext")]
      (if j then j.defQueue else U).push [ a, c, d ]
    
    define.amd = 
      multiversion: not 0
      plugins: not 0
      jQuery: not 0
    
    d.exec = (a) ->
      eval a
    
    d.execCb = (a, c, d, k) ->
      c.apply k, d
    
    d.addScriptToDom = (a) ->
      I = a
      (if y then x.insertBefore(a, y) else x.appendChild(a))
      I = null
    
    d.onScriptLoad = (a) ->
      c = a.currentTarget or a.srcElement
      if a.type == "load" or c and la.test(c.readyState)
        n = null
        a = c.getAttribute("data-requirecontext")
        h = c.getAttribute("data-requiremodule")
        t[a].completeLoad(h)
        (if c.detachEvent and not da then c.detachEvent("onreadystatechange", d.onScriptLoad) else c.removeEventListener("load", d.onScriptLoad, not 1))
    
    d.attach = (a, c, h, k, j, n) ->
      if G
        return k = k or d.onScriptLoad
        o = (if c and c.config and c.config.xhtml then document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") else document.createElement("script"))
        o.type = j or "text/javascript"
        o.charset = "utf-8"
        o.async = not v.skipAsync[a]
        c and o.setAttribute("data-requirecontext", c.contextName)
        o.setAttribute("data-requiremodule", h)
        (if o.attachEvent and not da then (O = not 0
        (if n then o.onreadystatechange = ->
          if o.readyState == "loaded"
            o.onreadystatechange = null
            o.attachEvent("onreadystatechange", k)
            n(o)
         else o.attachEvent("onreadystatechange", k))
        ) else o.addEventListener("load", k, not 1))
        o.src = a
        n or d.addScriptToDom(o)
        o
      else
        ca and (importScripts(a)
        c.completeLoad(h)
        )
      null
    
    if G
      u = document.getElementsByTagName("script")
      H = u.length - 1
      while H > -1 and (z = u[H])
        x = z.parentNode  unless x
        if A = z.getAttribute("data-main")
          unless r.baseUrl
            u = A.split("/")
            z = u.pop()
            u = (if u.length then u.join("/") + "/" else "./")
            r.baseUrl = u
            A = z.replace(aa, "")
          r.deps = (if r.deps then r.deps.concat(A) else [ A ])
          break
        H--
    d.checkReadyState = ->
      a = v.contexts
      for c of a
        return  if not (c of K) and a[c].waitCount
      d.resourcesReady not 0
    
    d.resourcesReady = (a) ->
      d.resourcesDone = a
      if d.resourcesDone
        for h of a = v.contexts
        a
          if not (h of K) and (c = a[h]
          c.jQueryIncremented
          )
            V(c.jQuery, not 1)
            c.jQueryIncremented = not 1
    
    d.pageLoaded = ->
      document.readyState = "complete"  if document.readyState != "complete"
    
    if G and document.addEventListener and not document.readyState
      document.readyState = "loading"
      window.addEventListener("load", d.pageLoaded, not 1)
    d r
    if d.isAsync and typeof setTimeout != "undefined"
      B = v.contexts[r.context or "_"]
      B.requireWait = not 0
      setTimeout(->
        B.requireWait = not 1
        B.takeGlobalQueue()
        B.jQueryCheck()
        B.scriptCount or B.resume()
        d.checkReadyState()
      , 0)
)()

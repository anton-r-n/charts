(function(w) {
  /* Namespace */
  var $ = w.$ = w.$ || {};

  /* Defaults */
  var barWidth = 8,
      barSpace = 10,
      margin = 32,
      minHeight = 24;

  /* Widget */
  $.Sankey = function(model) {
    model = $.obj(model);
    var meta = $.obj(model.meta);

    var width = (model._width || 300) - margin;
    var height = Math.max(+(meta.height || model._height), minHeight);

    var data = $.tableSplit(meta, model.data);
    var nodes = chart(meta, data, width, height);

    return $.n('div', {'class': 'Sankey'}, nodes);
  };

  function chart(meta, data, width, height) {
    var graph = collect(validate(data.tbody));
    var maxWeight = maxGraphWeight(graph);
    var maxVertex = $.arrMax(graph.map(countVertexes));
    var scale = {
      x: (width - barWidth - 1) / (graph.length - 1),
      y: (height - barSpace * (maxVertex - 1) - 2) / maxWeight,
    };
    var bars = barNodes(graph, scale).concat(arcNodes(graph, scale.y));
    return container(transform(bars), width, height);
  }

  function container(nodes, w, h) {
    return $.svg('svg', {'width': w, 'height': h}, nodes);
  };

  function transform(nodes) {
    return $.svg('g', {'transform': 'translate(.5,.5)'}, nodes);
  }

  function countVertexes(level) {
    return level.vertexes.length;
  }

  function barNodes(graph, scale) {
    var i, j, prev, cur, col, nodes = [];
    for (i = 0; i < graph.length; i++) {
      prev = null;
      col = graph[i].vertexes;
      for (j = 0; j < col.length; j++) {
        prev = barRect(col[j], prev, scale, i);
        nodes.push($.svg('path', barAttrs(prev, i, col[j].title)));
      }
    }
    return nodes;
  }

  function barRect(cur, prev, scale, i) {
    cur.x = $.round(i * scale.x);
    cur.h = $.round(cur.weight * scale.y);
    cur.y = prev ? prev.y + prev.h + barSpace : 0;
    cur.idx = prev ? prev.idx + 1 : 0;
    return cur;
  }

  function barAttrs(cur, i, title) {
    return {
      'data-tooltip': (title || 'None') + ': ' + $.humanize(cur.weight),
      'class': 'vertex group' + ((cur.idx + i) % 6),
      'd': barCoords(cur),
    };
  }

  function barCoords(cur) {
    return [
      'M',
      [cur.x, cur.y],
      [cur.x + barWidth, cur.y],
      [cur.x + barWidth, cur.y + cur.h],
      [cur.x, cur.y + cur.h],
      'z',
    ].join(' ');
  }

  function arcNodes(graph, scaleY) {
    var i, j, h, arc, source, target, nodes = [];
    for (i = 1; i < graph.length; i++) {
      for (j = 0; j < graph[i].arcs.length; j++) {
        arc = graph[i].arcs[j];
        source = arc.source;
        target = arc.target;
        source.y0 = source.y0 || 0;
        target.y1 = target.y1 || 0;
        h = scaleY * arc.weight;
        nodes.push(arcCurve(
            tooltip(arc),
            [source.x + barWidth, $.round(source.y + source.y0 + h / 2, 1)],
            [target.x, $.round(target.y + target.y1 + h / 2, 1)],
            h));
        source.y0 += h;
        target.y1 += h;
      }
    }
    return nodes;
  }

  function arcCurve(tooltip, p0, p1, h) {
    var cpX = (p1[0] - p0[0]) / 2 + p0[0];

    var attrs = {
      'class': 'arc',
      'stroke-width': $.round(h, 1),
      'data-tooltip': tooltip,
      'd': ['M', p0, 'C', [cpX, p0[1]], [cpX, p1[1]], p1].join(' '),
    };
    return $.svg('path', attrs);
  }

  function tooltip(arc) {
    return [
      arc.source.title || 'No previous',
      arc.target.title || 'No next',
    ].join(' — ') + ': ' + $.humanize(arc.weight);
  }

  /* @constructor */
  function Vertex(title) {
    this.title = title;
    this.sources = 0;
    this.targets = 0;
    this.weight = 0;
  }

  /* @constructor */
  function Arc(source, target) {
    this.source = source;
    this.target = target;
    this.weight = 0;
  }

  /* Collect arcs and vertexes from table which has
   * names on even columns and numbers on odd columns
   * t = [
   *   ['name1', 10, 'name2', 13, 'name3'],
   *   ['name4', 20, 'name2', 13, 'name5'],
   *   ...
   * ]
   */
  function collect(table) {
    var graph = [],
        len = table.length > 0 ? table[0].length : 0,
        prevVertexMap,
        vertexMap,
        arcMap,
        key,
        arc,
        source,
        target,
        vertex,
        weight,
        i,
        j;

    for (i = 0; i < len; i += 2) {
      arcMap = {};
      vertexMap = {};
      for (j = 0; j < table.length; j++) {
        key = table[j][i];
        vertex = vertexMap[key] = vertexMap[key] || new Vertex(key);
        if (i < len - 2) {
          vertex.targets += table[j][i + 1];
        }
        if (i > 1) {
          source = prevVertexMap[table[j][i - 2]];
          target = vertexMap[table[j][i]];

          key = source.title + ' ' + target.title;
          arc = arcMap[key] = arcMap[key] || new Arc(source, target);

          weight = table[j][i - 1];
          arc.weight += weight;
          vertex.sources += weight;
        }
      }
      prevVertexMap = vertexMap;
      graph.push({vertexes: vertexMap, arcs: arcMap});
    }
    return order(graph);
  }

  /* Build arrays ordered by weight for vertexes and arcs */
  function order(graph) {
    var i, j, v;
    for (i = 0; i < graph.length; i++) {
      for (j in graph[i].vertexes) {
        v = graph[i].vertexes[j];
        v.weight = Math.max(v.sources, v.targets);
      }
      graph[i].vertexes = objToArr(graph[i].vertexes, orderWeight);
    }
    for (i = 0; i < graph.length; i++) {
      graph[i].arcs = objToArr(graph[i].arcs, orderArcs);
    }
    return graph;
  }

  function orderArcs(a, b) {
    var sourceDiff = b.source.weight - a.source.weight;
    return sourceDiff !== 0 ? sourceDiff : b.target.weight - a.target.weight;
  }

  function orderWeight(a, b) {
    return b.weight - a.weight;
  }

  function objToArr(obj, fn) {
    var k, arr = [];
    for (k in obj) arr.push(obj[k]);
    return arr.sort(fn);
  }

  function maxGraphWeight(graph) {
    var i, j, level, weight, max = 0;
    for (i = 0; i < graph.length; i++) {
      level = graph[i];
      weight = 0;
      for (j in level.vertexes) {
        weight += level.vertexes[j].weight;
      }
      max = Math.max(max, weight);
    }
    return max;
  }

  /* Force non-negative numbers on even columns and strings on odd columns */
  function validate(t) {
    var x, y;
    var len = t.length > 0 ? t[0].length : 0;
    for (x = 0; x < len; x++) {
      for (y = 0; y < t.length; y++) {
        t[y][x] = x % 2 ? (t[y][x] > 0 ? t[y][x] : 0) : '' + t[y][x];
      }
    }
    return t;
  }
})(this);

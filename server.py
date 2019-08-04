import os
import SocketServer
from SimpleHTTPServer import SimpleHTTPRequestHandler

PORT = 7000
ROOT = os.path.join(os.getcwd(), 'build')


class MyTCPServer(SocketServer.TCPServer):
    allow_reuse_address = True


class MyHandler(SimpleHTTPRequestHandler):
    app = False

    wrapper = """
        {
          "widget": "Main",
          "title": "Test App",
          "prefix": "/api/data/",
          "menu": {
            "#_open": true,
            "#_expanded": true,
            "items": [
              {"title": "Home", "link": "/"},
              {"title": "Basic Text", "link": "/text/"},
              {"title": "Form Fields", "link": "/form/"},
              {"title": "Bar Chart", "link": "/barChart/"},
              {"title": "Bar Stack Chart", "link": "/barStackChart/"},
              {"title": "Geo Map Chart", "link": "/geoChart/"},
              {"title": "Area Chart", "link": "/areaChart/"},
              {"title": "Line Chart", "link": "/lineChart/"},
              {"title": "Top Paths", "link": "/topPaths/"},
              {"title": "Layout Test", "link": "/layout/"},
              {"title": "Menu Item 2", "link": "/page2/"},
              {"title": "Menu Item 3", "link": "/page3/"},
              {"title": "Another Item", "link": "/another/item/"},
              {"title": "Cool Service", "link": "/service1/"},
              {"title": "Something Insights", "link": "/insights/"},
              {"title": "Analysis", "link": "/analysis/"},
              {"title": "Monitoring", "link": "/monitoring/"}
            ]
          },
          "data": %s
        }
    """

    tiles = "/Users/anton/github/dashboards/tiles/"

    def translate_path(self, path):
        if path.startswith('/api/app/'):
            self.app = True
            path = path.replace('/api/app/', '/api/data/')

        if path.endswith('.css') or path.endswith('.js'):
            path += '.gz'

        if path.startswith('/favicon.ico'):
            path = '/static/img/favicon.ico'
        elif path == '/api/data/':
            path = '../../mock/index.json'
        elif path.startswith('/api/data/'):
            path = path.replace('/api/data/', '../../mock/')
            if path.endswith('/'):
                path = path[:len(path)-1]
            path = '%s.json' % path
        elif path.startswith('/static/1/tiles/'):
            return self.tiles + path[16:]
        elif path.startswith('/static/1/'):
            path = path.replace('/static/1/', '/static/')
        else:
            path = '/app.html'

        path = os.path.normpath(ROOT + path)
        return path

    def set_headers(self, path):
        if path.endswith('.gz'):
            path = path[:len(path)-3]
            self.send_header("Content-encoding", "gzip")
        if path.endswith('.html'):
            self.send_header("Content-type", "text/html")
        elif path.endswith('.ico'):
            self.send_header("Content-type", "image/x-icon")
        elif path.endswith('.json'):
            self.send_header("Content-type", "application/json")
        elif path.endswith('.css'):
            self.send_header("Content-type", "text/css")
        elif path.endswith('.js'):
            self.send_header("Content-type", "application/javascript")
        elif path.endswith('.png'):
            self.send_header("Content-type", "image/png")
            self.send_header("Cache-Control", "max-age=604800")
        else:
            self.send_header("Content-type", "application/octet-stream")

    def wrap(self, content):
        return self.wrapper % content
        
    def do_GET(self):
        path = self.translate_path(self.path)
        if os.path.exists(path) and os.path.isfile(path):
            with open(path, 'r') as f:
                content = f.read()
                if self.app:
                    content = self.wrap(content)
                self.send_response(200)
                self.send_header("Content-length", len(content))
                self.set_headers(path)
                self.end_headers()
                self.wfile.write(content)
                return  
        self.send_response(404)
        self.send_header("Content-length", 0)
        self.send_header("Connection", "close")
        self.send_header("Content-type", "text/plain")
        self.end_headers()


if __name__ == "__main__":
    try:
        httpd = MyTCPServer(("", PORT), MyHandler)
        print "Serving at port", PORT
        httpd.serve_forever()

    except KeyboardInterrupt:
        print('Shutting down server')

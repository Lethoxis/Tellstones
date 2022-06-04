import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app) {
    app.use(
        createProxyMiddleware(["/api", "/otherApi"], {
            target: "https://tellstones-server.herokuapp.com",
        })
    );
}

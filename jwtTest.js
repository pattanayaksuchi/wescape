var request = require("request");

var options = {
  method: "GET",
  url: "http://localhost:3001/private",
  headers: {
    authorization:
      "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InZDUmFDdE9LT1pvWU9xRmFMc05CZCJ9.eyJpc3MiOiJodHRwczovL3dlc2NhcGUtY2hlY2tvdXQtcGFnZS1kZXYudXMuYXV0aDAuY29tLyIsInN1YiI6IldsSGY1R2c0TUZTZkRPMDNLbm1TbkM5WTc1OTVtVG9lQGNsaWVudHMiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDEiLCJpYXQiOjE1OTMxOTQ1ODIsImV4cCI6MTU5MzI4MDk4MiwiYXpwIjoiV2xIZjVHZzRNRlNmRE8wM0tubVNuQzlZNzU5NW1Ub2UiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.THPsxlVayOgSL8d3daLpoh1RjzUORh-XzqNg8zDJQn4s_XYbi6FqbUGA5V0KB469xm5UEK1FDjTUtGLVBYGsC4PhxF_dHmL5qZKjBpuwgT69Hbk0Nq6n9DmrGU85Jt3PZ-ejUXHXs1hzVhZuoQYYqqE69uIlJ77ouzGVTJDS-uiDhmvgkg2-iESw7X94lgzgzvKwbOUF_rE4qrdZjhhs5A6CZgQhgCKaDcQ4g6I4MCoVZ9cXVCNlMhkokWPUfff7Jn1IB-xOoT7iStASe2VMyhwpEdPovA77ayCPQJKHWuKEEH8SQa_gtuk3DTweQmpM1dY5I_C7HL5eddI_-aopAw",
  },
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

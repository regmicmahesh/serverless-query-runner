# Dead Simple Postgres Data Viewer and Query Runner

## Environment Variables

### GITHUB_CLIENT_ID 

Github Client ID of the Oauth Application for protecting your query runner instance. [Create here](https://github.com/settings/applications/new)

### GITHUB_CLIENT_SECRET

Github Client Secret of the Oauth Application for protecting your query runner instance. [Create here](https://github.com/settings/applications/new)

### GITHUB_CALLBACK_URL

Github Callback URL of the Oauth Application. [Create here](https://github.com/settings/applications/new). Make sure it is synced with your deployment's load balancer / route53 record / api gateway endpoint.


### GITHUB_ALLOWED_USERNAMES

Comma separated values of github username, only the listed usernames will be allowed to log into the query runner instance.

### PSQL_CONNSTR

Connection String for PostgreSQL.



## X Admin

This project is an open-source, low-code framework to create internal admin tools for governance use cases. 

---

### Features

The following features are present out of the box:
- Authentication and Authorization using Next-Auth and FusionAuth
- Data collection through ODK *(WIP)*
- REST API on collected data through Loopback
- GraphQL API on collected data through Hasura
- Admin console to view (sort/filter), update and delete data through Next.js + React-Admin
- Customize admin theme through tenants *(WIP)*
- Role-based access control on the frontend and API layer via Hasura and React-Admin
- Metabase to visualise collected data inside Postgres *(WIP)*

All of the parts are unbundled and can be extended to meet any standard (or non-standard) requirements.

### Developer Installation

- In the root directory:
    ```bash 
    docker-compose up -d --build \
    cd portal \
    npm run dev
    ```
- Navigate to **`localhost:3000`** to view the admin console running

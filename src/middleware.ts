import { withAuth } from "next-auth/middleware"

export default withAuth(
    function middleware(req) {

    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                return !!token
            }
        },
        pages: {
            signIn: "/login"
        }
    }
)

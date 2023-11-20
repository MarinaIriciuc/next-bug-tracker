import {withAuth} from "next-auth/middleware"

export default withAuth(
    {
        callbacks: {
            authorized: ({token, req}) => {
                if (req.nextUrl.pathname.startsWith("/register")) {
                    return !token;
                }
                return !!token
            }
        },
        pages: {
            signIn: "/login"
        }
    }
)

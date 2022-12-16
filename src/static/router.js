import GetStudent from "../router/global/get-student/GetStudent"
import CreateStudent from "../router/global/create-student/CreateStudent"
import CreateGroup from "../router/global/create-group/CreateGroup"
import { AiOutlineUsergroupAdd, AiOutlineUserAdd } from "react-icons/ai";


export const GLOBAL_ROUTERS = [
    {
        title: "All Students",
        path: "/get-student",
        element: <GetStudent/>,
        icon: <AiOutlineUsergroupAdd />,
    },
    {
        title: "Create Student",
        path: "/create-student",
        element: <CreateStudent/>,
        icon: <AiOutlineUserAdd />,
    },
    {
        title: "Create Group",
        path: "/create-group",
        element: <CreateGroup/>,
        icon: <AiOutlineUsergroupAdd />,
    }
]
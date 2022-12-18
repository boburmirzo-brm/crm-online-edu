import GetStudent from "../router/global/get-student/GetStudent"
import CreateStudent from "../router/global/create-student/CreateStudent"
import CreateGroup from "../router/global/create-group/CreateGroup"
import CreateMember from "../router/global/create-member/CreateMember"
import GetGroup from "../router/global/get-group/GetGroup"
import GetTeacher from "../router/global/get-teacher/GetTeacher"
import Statistics from "../router/global/statistics/Statistics"
import { AiOutlineUsergroupAdd, AiOutlineUserAdd } from "react-icons/ai";


export const GLOBAL_ROUTERS = [
    {
        title: "O'quvchilar",
        path: "/get-student",
        element: <GetStudent/>,
        icon: <AiOutlineUsergroupAdd />,
    },
    {
        title: "O'quvchini ro'yhatga olish",
        path: "/create-student",
        element: <CreateStudent/>,
        icon: <AiOutlineUserAdd />,
    },
    {
        title: "Guruhlar",
        path: "/get-group",
        element: <GetGroup/>,
        icon: <AiOutlineUsergroupAdd />,
    },
    {
        title: "Yangi guruh ochish",
        path: "/create-group",
        element: <CreateGroup/>,
        icon: <AiOutlineUsergroupAdd />,
    },
    {
        title: "O'qituvchilar",
        path: "/get-teacher",
        element: <GetTeacher/>,
        icon: <AiOutlineUserAdd />,
    },
    {
        title: "Hodimni ro'yhatga olish",
        path: "/create-member",
        element: <CreateMember/>,
        icon: <AiOutlineUserAdd />,
    },
    {
        title: "Statistika",
        path: "/statistics",
        element: <Statistics/>,
        icon: <AiOutlineUserAdd />,
    },
]
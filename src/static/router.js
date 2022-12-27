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
        teacher:false,
        admin: true,
        accounter: false,
        receptionist:true,
        owner:true,
    },
    {
        title: "O'quvchini ro'yhatga olish",
        path: "/create-student",
        element: <CreateStudent/>,
        icon: <AiOutlineUserAdd />,
        teacher:false,
        admin: true,
        accounter: false,
        receptionist:true,
        owner:true,
    },
    {
        title: "Guruhlar",
        path: "/get-group",
        element: <GetGroup/>,
        icon: <AiOutlineUsergroupAdd />,
        teacher:false,
        admin: true,
        accounter: false,
        receptionist:true,
        owner:true,
    },
    {
        title: "Yangi guruh ochish",
        path: "/create-group",
        element: <CreateGroup/>,
        icon: <AiOutlineUsergroupAdd />,
        teacher:false,
        admin: true,
        accounter: false,
        receptionist:true,
        owner:true,
    },
    {
        title: "O'qituvchilar",
        path: "/get-teacher",
        element: <GetTeacher/>,
        icon: <AiOutlineUserAdd />,
        teacher:false,
        admin: true,
        accounter: false,
        receptionist:false,
        owner:true,
    },
    {
        title: "Hodimni ro'yhatga olish",
        path: "/create-member",
        element: <CreateMember/>,
        icon: <AiOutlineUserAdd />,
        teacher:false,
        admin: true,
        accounter: false,
        receptionist:false,
        owner:true,
    },
    {
        title: "Statistika",
        path: "/statistics",
        element: <Statistics/>,
        icon: <AiOutlineUserAdd />,
        teacher:false,
        admin: true,
        accounter: false,
        receptionist:false,
        owner:true,
    },
]
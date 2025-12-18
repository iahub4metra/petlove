import LogOutBtn from '../LogOut/LogOutBtn';
import EditUserBtn from './EditUserBtn';
import UserBlock from './UserBlock';

export default function UserCard() {
    return (
        <div className="bg-white rounded-[30px] px-5 pb-[40px] pt-[18px] relative xl:w-[520px] md:p-10 h-fit">
            <EditUserBtn />
            <UserBlock />
            <LogOutBtn />
        </div>
    );
}

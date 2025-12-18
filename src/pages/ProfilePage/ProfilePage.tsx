import MyNotices from '../../components/MyNotices/MyNotices';
import UserCard from '../../components/UserCard/UserCard';

export default function ProfilePage() {
    return (
        <div className="my-0 mx-auto max-w-[375px] w-full py-0 px-[20px] md:max-w-[768px] md:px-[32px] xl:max-w-[1280px]">
            <section className="flex flex-col gap-10 md:gap-8 xl:flex-row">
                <UserCard />
                <MyNotices />
            </section>
        </div>
    );
}

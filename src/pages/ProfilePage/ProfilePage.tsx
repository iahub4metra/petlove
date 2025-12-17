import MyNotices from '../../components/MyNotices/MyNotices';
import UserCard from '../../components/UserCard/UserCard';

export default function ProfilePage() {
    return (
        <div className="adaptive-container">
            <section className="flex flex-col gap-10 md:gap-8 xl:flex-row">
                <UserCard />
                <MyNotices />
            </section>
        </div>
    );
}

import type { Friends } from '../App/types';

export interface FriendsItemProps {
    friend: Friends;
}

export default function FriendsItem({ friend }: FriendsItemProps) {
    const getSchedule = () => {
        const workDays = friend.workDays;
        if (!workDays || workDays.length === 0) {
            return 'Online shop';
        }

        const openDays = workDays.filter((day) => day.isOpen);

        if (openDays.length === 0) {
            return 'Online shop';
        }
        return `${openDays[0].from} - ${openDays[0].to}`;
    };

    return (
        <>
            <a
                href={friend.url}
                target="_blank"
                className="w-[80px] h-[80px] md:w-[90px] md:h-[90px] block"
            >
                <img
                    src={friend.imageUrl}
                    alt={`${friend.title}'s logo`}
                    className="w-[80px] h-[80px] md:w-[90px] md:h-[90px]"
                />
            </a>

            <div>
                <h4 className="text-[#262626] text-[16px] font-black leading-5 tracking-[-0.64px] mb-[14px]">
                    {friend.title}
                </h4>
                <div className="flex flex-col gap-2">
                    <p className="text-[#26262680] text-[14px] font-medium leading-[18px] tracking-[-0.28px] flex items-center gap-0.5">
                        Email:
                        <a
                            type="email"
                            href={
                                friend.email
                                    ? `mailto:${friend.email}`
                                    : undefined
                            }
                            target="_blank"
                            className="text-[#262626] text-[14px] font-medium tracking-[-0.28px] leading-[18px]"
                        >
                            {friend.email ? friend.email : 'Phone only'}
                        </a>
                    </p>
                    <p className="text-[#26262680] text-[14px] font-medium leading-[18px] tracking-[-0.28px] flex items-center gap-0.5">
                        Address:
                        <a
                            type="map"
                            href={friend.addressUrl ?? undefined}
                            target="_blank"
                            className="overflow-ellipsis overflow-hidden w-[137px] text-[#262626] text-[14px] font-medium tracking-[-0.28px] leading-[18px] max-h-[18px] inline-block"
                        >
                            {friend.address ? friend.address : 'Website only'}
                        </a>
                    </p>
                    <p className="text-[#26262680] text-[14px] font-medium leading-[18px] tracking-[-0.28px] flex items-center gap-0.5">
                        Phone:
                        <a
                            type="phone"
                            href={
                                friend.phone ? `tel:${friend.phone}` : undefined
                            }
                            className="text-[#262626] text-[14px] font-medium tracking-[-0.28px] leading-[18px]"
                        >
                            {friend.phone ? friend.phone : 'Email only'}
                        </a>
                    </p>
                </div>
            </div>
            <div className="absolute top-[12px] right-[12px] bg-[#FFF4DF] rounded-[30px] p-2 text-[#F6B83D] font-medium text-[12px] leading-4 tracking-[-0.24px]">
                <p>{getSchedule()}</p>
            </div>
        </>
    );
}

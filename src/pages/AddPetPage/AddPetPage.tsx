export default function AddPetPage() {
    const imagePrefix = 'images/addPet';

    return (
        <section>
            <div className="adaptive-container">
                <div className="flex justify-center xl:items-end relative rounded-[30px] md:rounded-[60px] shrink-0 xl:h-[654px] bg-[#F6B83D] recktangle bg-[url(/images/Rectangle.png)] bg-no-repeat bg-[center_37px] bg-size-[300px_241px] md:bg-size-[528px_251px] md:bg-position-[center_53px] xl:w-[592px] xl:bg-[url(/images/bg-pet-desc.png)] xl:bg-size-[512px_598px] xl:bg-position-[center_bottom]">
                    <picture>
                        <source
                            srcSet={`${imagePrefix}/mobile.png 1x, ${imagePrefix}/mobile@2x.png 2x`}
                            media="(max-width: 767px)"
                        />
                        <source
                            srcSet={`${imagePrefix}/tablet.png 1x, ${imagePrefix}/tablet@2x.png 2x`}
                            media="(min-width: 768px) and (max-width: 1279px)"
                        />
                        <source
                            srcSet={`${imagePrefix}/desc.png 1x, ${imagePrefix}/desc@2x.png 2x`}
                            media="(min-width: 1280px)"
                        />
                        <img
                            src={`${imagePrefix}/mobile.png`}
                            alt="dog with glasses"
                            className="xl:h-[648px]"
                        />
                    </picture>
                </div>
            </div>
        </section>
    );
}

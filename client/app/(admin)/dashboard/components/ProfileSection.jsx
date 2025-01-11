const ProfileSection = ({ title, children }) => (
    <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        {children}
    </section>
);

export default ProfileSection;
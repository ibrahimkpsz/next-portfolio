"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchEducation, fetchExperience, fetchProject, fetchUserData } from "@/redux/reducers/profileSlice";
import Link from "next/link";
import { useEffect } from "react";
import { FaGithub, FaInstagram, FaLink, FaLinkedinIn, FaSpinner, FaUpload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ProfileSection from "./components/ProfileSection";
import Experience from "./components/Experience";
import Education from "./components/Education";
import ProjectCard from "./components/ProjectCard";
import Photo from "./components/Photo";

export default function Home() {
    const dispatch = useDispatch();
    const { user, experiences, educations, projects, userStatus, experiencesStatus, educationsStatus, projectsStatus } = useSelector((state) => state.profile);

    useEffect(() => {
        dispatch(fetchUserData());
        dispatch(fetchExperience());
        dispatch(fetchEducation());
        dispatch(fetchProject());
    }, [dispatch]);

    if ((userStatus && experiencesStatus && educationsStatus && projectsStatus) === "idle") {
        return (
            <div className="flex items-center justify-center w-full h-screen">
                <FaSpinner className="animate-spin" />
            </div>
        );
    }

    const socialLinks = [
        { url: user[0]?.urls.linkedin, icon: <FaLinkedinIn /> },
        { url: user[0]?.urls.github, icon: <FaGithub /> },
        { url: user[0]?.urls.instagram, icon: <FaInstagram /> },
        { url: user[0]?.urls.custom_url, icon: <FaLink /> }
    ];

    return (
        <main className="flex flex-col max-w-3xl min-h-screen px-6 py-12 mx-auto space-y-10 antialiased bg-background">
            {user[0] && (
                <ProfileSection>
                    <div className="flex flex-col items-center w-full gap-5 sm:flex-row">
                        {renderProfilePhoto(user)}
                        <div className="flex flex-col items-center w-full gap-3 text-center sm:text-start sm:items-start sm:gap-6">
                            <div className="flex flex-col gap-1 sm:gap-2">
                                <h1 className="text-3xl font-bold tracking-tight md:text-5xl sm:text-4xl">{user[0]?.name + " " + user[0]?.surname}</h1>
                                <p className="text-base md:text-lg">{user[0]?.shortbio}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" asChild>
                                    <Link href={`mailto:${user[0]?.email}`}>Contact me</Link>
                                </Button>
                                {socialLinks.map((link, index) => link.url && (
                                    <Button key={index} variant="outline" size="icon" asChild>
                                        <Link href={link.url}>
                                            {link.icon}
                                        </Link>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </ProfileSection>
            )}
            {user[0]?.about != null && <ProfileSection title="About"><p className="text-sm text-justify">{user[0]?.about}</p></ProfileSection>}
            {user[0]?.skills.length > 0 && renderSkills(user[0]?.skills)}
            {experiences?.length > 0 && renderExperience(experiences)}
            {educations?.length > 0 && renderEducations(educations)}
            {projects?.length > 0 && renderProjects(projects)}
        </main>
    );
}

const renderProfilePhoto = (user) => {
    if (user[0]?.photo) {
        return <Photo src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${user[0].photo}`} alt={`${user[0].name} ${user[0].surname}`} />;
    }
    if (user[0]?.name && user[0]?.surname) {
        return <Photo src={`https://avatar.iran.liara.run/username?username=${user[0].name}+${user[0].surname}`} alt="upload your photo" />;
    }
    return (
        <div className="bg-gray-200 rounded-sm w-60 aspect-square" />
    );
};

const renderSkills = (skills) => {
    return (
        <ProfileSection title="Skills">
            <div className="flex flex-wrap items-center gap-2">
                {skills.map((skill) => (
                    <Badge key={skill.id}>{skill.text}</Badge>
                ))}
            </div>
        </ProfileSection>
    )
}

const renderExperience = (experiences) => {
    return (
        <ProfileSection title="Experience">
            {experiences.map((experience) => (
                <Experience key={experience._id} title={experience.position} company={experience.company} date={experience.startEndDate} />
            ))}
        </ProfileSection>
    )
}

const renderEducations = (educations) => {
    return (
        <ProfileSection title="Education">
            {educations.map((edu) => (
                <Education key={edu._id} degree={edu.degree} institution={edu.university} date={edu.startEndDate} />
            ))}
        </ProfileSection>
    )
}

const renderProjects = (projects) => {
    return (
        <ProfileSection title="Projects">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {projects.map((project) => (
                    <ProjectCard
                        key={project._id}
                        title={project.name}
                        date={project.createdAt}
                        description={project.description}
                        imageUrl={project.photo}
                        websiteLink={project.website}
                        sourceLink={project.github}
                    />
                ))}
            </div>
        </ProfileSection>
    )
}


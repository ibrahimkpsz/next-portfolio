"use client"

import React, { useEffect } from 'react'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaGithub, FaInstagram, FaLink, FaLinkedinIn, FaSpinner } from "react-icons/fa";
import { useForm } from "react-hook-form"
import ProfileSection from './components/ProfileSection';
import Experience from './components/Experience';
import Education from './components/Education';
import Project from "./components/Project";
import ProfileEditor from "./components/ProfileEditor"
import { useDispatch, useSelector } from 'react-redux';
import { fetchEducation, fetchExperience, fetchProject, fetchUserData } from '@/redux/reducers/profileSlice';
import { ScrollArea } from "@/components/ui/scroll-area";
import Photo from "./components/Photo";
import ChangePhoto from "./components/ChangePhoto";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { user, experiences, educations, projects, userStatus, experiencesStatus, educationsStatus, projectsStatus } = useSelector((state) => state.profile);

    useEffect(() => {
        dispatch(fetchUserData());
        dispatch(fetchExperience());
        dispatch(fetchEducation());
        dispatch(fetchProject());
    }, [dispatch]);

    const userHandler = () => {
        dispatch(fetchUserData());
    };

    const experienceHandler = () => {
        dispatch(fetchExperience());
    };

    const educationHandler = () => {
        dispatch(fetchEducation());
    };

    const projectHandler = () => {
        dispatch(fetchProject());
    };

    const socialLinks = [
        { url: user[0]?.urls.linkedin, icon: <FaLinkedinIn /> },
        { url: user[0]?.urls.github, icon: <FaGithub /> },
        { url: user[0]?.urls.instagram, icon: <FaInstagram /> },
        { url: user[0]?.urls.custom_url, icon: <FaLink /> }
    ];

    const {
        register,
        handleSubmit,
        watch,
        control,
        setValue,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
    });

    const [name, surname, shortbio, skills, about] = watch(["name", "surname", "shortbio", "skills", "about"]);

    useEffect(() => {
        if (user[0]) {
            setValue("name", user[0].name || "");
            setValue("surname", user[0].surname || "");
            setValue("email", user[0].email || "");
            setValue("shortbio", user[0].shortbio || "");
            setValue("urls.linkedin", user[0].urls.linkedin || "");
            setValue("urls.github", user[0].urls.github || "");
            setValue("urls.instagram", user[0].urls.instagram || "");
            setValue("urls.custom_url", user[0].urls.custom_url || "");
            setValue("about", user[0].about || "");
            setValue("skills", user[0].skills || []);
        }
    }, [user, setValue]);

    if ((userStatus && experiencesStatus && educationsStatus && projectsStatus) === "idle") {
        return (
            <div className="flex items-center justify-center w-full h-screen">
                <FaSpinner className="animate-spin" />
            </div>
        );
    }

    return (
        <div className='grid grid-cols-5'>
            <ScrollArea className="hidden h-screen col-span-3 md:block">
                {user[0] && (
                    <div className="flex-col hidden max-w-5xl min-h-screen px-6 py-12 mx-auto space-y-10 antialiased md:flex bg-background">
                        <ProfileSection>
                            <div className="flex flex-col items-center w-full gap-5 sm:flex-row">
                                {renderProfilePhoto(user, userHandler)}
                                <div className="flex flex-col items-center w-full gap-3 text-center sm:text-start sm:items-start sm:gap-6">
                                    <div className="flex flex-col gap-1 sm:gap-2">
                                        <h1 className="text-3xl font-bold tracking-tight md:text-5xl sm:text-4xl">{name + " " + surname}</h1>
                                        <p className="text-base md:text-lg">{shortbio}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {user[0]?.email && (
                                            <Button variant="outline" asChild>
                                                <Link href={`mailto:${user[0]?.email}`}>Contact me</Link>
                                            </Button>
                                        )}
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
                        {about?.length > 0 && <ProfileSection title="About"><p className="text-sm text-justify">{about}</p></ProfileSection>}
                        {skills?.length > 0 && renderSkills(skills)}
                        {experiences?.length > 0 && renderExperiences(experiences)}
                        {educations?.length > 0 && renderEducations(educations)}
                        {projects?.length > 0 && renderProjects(projects)}
                    </div>
                )}
            </ScrollArea>
            <ScrollArea className="h-screen col-span-5 md:col-span-2 border-s">
                <ProfileEditor user={user} skills={skills} experiences={experiences} educations={educations} projects={projects} handleSubmit={handleSubmit} register={register} control={control} setValue={setValue} errors={errors} userHandler={userHandler} experienceHandler={experienceHandler} educationHandler={educationHandler} projectHandler={projectHandler} />
            </ScrollArea>
        </div>
    )
}

const renderProfilePhoto = (user, userHandler) => {
    if (user[0]?.photo) {
        return <Photo userHandler={userHandler} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${user[0].photo}`} alt={`${user[0].name} ${user[0].surname}`} />;
    }
    if (user[0]?.name && user[0]?.surname) {
        return <Photo userHandler={userHandler} src={`https://avatar.iran.liara.run/username?username=${user[0].name}+${user[0].surname}`} alt="upload your photo" />;
    }
    return (
        <div className="relative w-60 group">
            <div className="relative">
                <div className="border-2 border-dashed rounded-sm aspect-square" />
                <div className="absolute inset-0 transition-opacity duration-300 rounded-sm opacity-0 bg-black/30 backdrop-blur-sm group-hover:opacity-100" />
            </div>
            <div className="absolute text-white transition-opacity -translate-x-1/2 -translate-y-1/2 opacity-0 top-1/2 left-1/2 group-hover:opacity-100">
                <ChangePhoto onChangePhoto={userHandler} />
            </div>
        </div>
    );
};

const renderSkills = (skills) => {
    return (
        <ProfileSection title='Skills'>
            <div className="flex flex-wrap items-center gap-2">
                {skills?.map((skill) => (
                    <Badge key={skill.id}>{skill.text}</Badge>
                ))}
            </div>
        </ProfileSection>
    )
}

const renderExperiences = (experiences) => {
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
            <div className="grid grid-cols-1 gap-3 xl:grid-cols-3">
                {projects.map((project) => (
                    <Project
                        key={project._id}
                        title={project.name}
                        description={project.description}
                        date={project.createdAt}
                        imageUrl={project.photo}
                        websiteLink={project.website}
                        sourceLink={project.github}
                    />
                ))}
            </div>
        </ProfileSection>
    )
}

export default Dashboard
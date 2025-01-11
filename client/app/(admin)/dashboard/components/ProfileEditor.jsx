import React, { useState } from 'react'
import { Controller } from "react-hook-form"
import { Input } from '@/components/ui/input';
import { TagInput } from 'emblor';
import { Textarea } from '@/components/ui/textarea';
import AddExperience from './AddExperience';
import AddEducation from './AddEducation';
import AddProject from './AddProject';
import ExperienceCard from "./ExperienceCard";
import EducationCard from "./EducationCard";
import ProjectCard from "./ProjectCard";
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { Button } from '@/components/ui/button';

const ProfileEditor = ({ user, skills, experiences, educations, projects, handleSubmit, register, control, setValue, errors, userHandler, experienceHandler, educationHandler, projectHandler }) => {
    const { toast } = useToast();

    const [tags, setTags] = useState(skills || []);
    const [activeTagIndex, setActiveTagIndex] = useState(null);

    const onSubmit = async (data) => {
        const response = await axios.post("/api/user/profile", data);
        if (response.status === 200) {
            userHandler();
            toast({
                description: "Your profile has been successfully updated.",
                duration: 5000
            })
        } else {
            toast({
                description: "There was an error updating your profile. Please try again.",
                duration: 5000
            })
        }
    };

    return (
        <form key={1} className="flex flex-col gap-5 p-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3">
                <div className="text-base font-semibold">Profile</div>
                <div className="flex items-center gap-3">
                    <div className="flex flex-col w-full gap-1">
                        <label className="text-xs" htmlFor="name">Name</label>
                        <Input
                            defaultValue={user[0]?.name || ""}
                            placeholder="Enter your name"
                            {...register("name")}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label className="text-xs" htmlFor="surname">Surname</label>
                        <Input
                            defaultValue={user[0]?.surname || ""}
                            placeholder="Enter your surname"
                            {...register("surname", { required: true })}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs" htmlFor="short_bio">Email</label>
                    <Input
                        defaultValue={user[0]?.email || ""}
                        placeholder="Enter your email"
                        {...register("email", { required: true })}
                        maxLength={100}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs" htmlFor="short_bio">Short Bio</label>
                    <Input
                        defaultValue={user[0]?.shortbio || ""}
                        placeholder="Briefly describe yourself"
                        {...register("shortbio", { required: true })}
                        maxLength={100}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <div className="text-base font-semibold">URLs</div>
                <div className="flex items-center gap-3">
                    <div className="flex flex-col w-full gap-2">
                        <label className="text-xs" htmlFor="linkedin">Linkedin</label>
                        <Input
                            defaultValue={user[0]?.urls.linkedin || ""}
                            placeholder="linkedin.com/in/username"
                            {...register("urls.linkedin")}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <label className="text-xs" htmlFor="github">Github</label>
                        <Input
                            defaultValue={user[0]?.urls.github || ""}
                            placeholder="github.com/username"
                            {...register("urls.github")}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex flex-col w-full gap-2">
                        <label className="text-xs" htmlFor="instagram">Instagram</label>
                        <Input
                            defaultValue={user[0]?.urls.instagram || ""}
                            placeholder="instagram.com/username"
                            {...register("urls.instagram")}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <label className="text-xs" htmlFor="custom_url">Custom URL</label>
                        <Input
                            defaultValue={user[0]?.urls.custom_url || ""}
                            placeholder="example.com"
                            {...register("urls.custom_url")}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <div className="text-base font-semibold">Profile Details</div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs" htmlFor="about">About</label>
                    <Textarea
                        defaultValue={user[0]?.about || ""}
                        rows="10"
                        placeholder="Tell us about yourself"
                        {...register("about")}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs" htmlFor="skills">Skills</label>
                    <Controller
                        name="skills"
                        control={control}
                        render={({ field }) => (
                            <TagInput
                                {...field}
                                size="sm"
                                maxLength={50}
                                maxTags={50}
                                animation="bounce"
                                tags={skills || tags}
                                className="w-full"
                                id="tag-input"
                                styleClasses={{
                                    tag: { body: "ps-3" },
                                }}
                                setTags={(newTags) => {
                                    setTags(newTags);
                                    setValue("skills", newTags);
                                }}
                                activeTagIndex={activeTagIndex}
                                setActiveTagIndex={setActiveTagIndex}
                            />
                        )}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                    <div className="text-base font-semibold">Experiences</div>
                    <AddExperience onAddExperience={experienceHandler} />
                </div>
                <ExperienceCard onDeleteExperience={experienceHandler} experiences={experiences} toast={toast} />
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                    <div className="text-base font-semibold">Educations</div>
                    <AddEducation onAddEducation={educationHandler} />
                </div>
                <EducationCard onDeleteEducation={educationHandler} educations={educations} toast={toast} />
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                    <div className="text-base font-semibold">Projects</div>
                    <AddProject onAddProject={projectHandler} />
                </div>
                <ProjectCard onDeleteProject={projectHandler} projects={projects} toast={toast} />
            </div>
            {errors.surname && <span>This field is required</span>}
            <Button className="w-full">Save</Button>
        </form>
    )
}

export default ProfileEditor
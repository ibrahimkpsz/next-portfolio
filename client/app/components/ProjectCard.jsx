import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import moment from "moment";
import { FaGithub } from "react-icons/fa";

const formatDate = (dateString) => {
    return moment(dateString).locale('en').format('LL');
};

const ProjectCard = ({ title, date, description, imageUrl, websiteLink, sourceLink }) => (
    <div className="transition-all border rounded-lg hover:shadow-sm bg-card">
        <img className="object-cover w-full h-40 rounded-t-lg" src={process.env.NEXT_PUBLIC_BACKEND_URL + imageUrl} alt="" />
        <div className="p-3 space-y-1">
            <div className="font-semibold truncate">{title}</div>
            <span className="text-xs">{formatDate(date)}</span>
            <p className="text-sm truncate">{description}</p>
        </div>
        <div className="flex items-center gap-2 p-3">
            <Button variant="outline" size="sm" asChild>
                <a href={websiteLink}>
                    <ExternalLink />
                    <span>Website</span>
                </a>
            </Button>
            <Button size="sm" asChild>
                <a href={sourceLink}>
                    <FaGithub />
                    <span>Source</span>
                </a>
            </Button>
        </div>
    </div>
);

export default ProjectCard;
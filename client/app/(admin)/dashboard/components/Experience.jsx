import { MdWork } from "react-icons/md";
import moment from 'moment';

const formatDate = (dateString) => {
    return moment(dateString).locale('en').format('LL');
};

const Experience = ({ title, company, date }) => (
    <div className="flex items-center justify-between py-1">
        <div className="flex items-center gap-3">
            <div className="p-3 border rounded-full">
                <MdWork className="mx-auto" />
            </div>
            <div className="flex flex-col">
                <div className="text-sm font-semibold">{title}</div>
                <div className="text-xs">{company}</div>
            </div>
        </div>
        {date.to ? <span className="text-xs">{formatDate(date.from) + " - " + formatDate(date.to)}</span> : <span className="text-xs">{formatDate(date.from) + " - " + "Present"}</span>}
    </div>
);

export default Experience;
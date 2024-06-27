import Input from "components/HTML/Input.tsx";
import {Label} from "@radix-ui/react-dropdown-menu";

const Settings = () => {
    return (
        <>
            <div className="pb-6 border-b border-slate-300">
                <h3>Profile</h3>
                <p>This is how others will see you on the site.</p>
            </div>
            <div>
                <Label>Username</Label>
                <Input />
                <p>This is your public display name. It can be your real name or a pseudonym. You can only change this once every 30 days.</p>
            </div>
            <div>
                <Label>Email</Label>
                <Input />
                <p>You can manage verified email addresses in your email settings.</p>
            </div>
            <div>
                <Label>Bio</Label>
                <Input />
                <p>You can manage verified email addresses in your email settings.</p>
            </div>
        </>
    )
}

export default Settings
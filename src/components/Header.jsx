import chefClaudeLogo from "../images/chef-claude-icon.png";

export function Header() {
    return (
        <header>
            <img src={chefClaudeLogo} alt="chef-logo"/>
            <h1>Recipe Genie</h1>
        </header>
    )
}
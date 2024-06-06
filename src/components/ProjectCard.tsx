import cx from "classnames"
import css from "./ProjectCard.module.scss"

interface IDropdown {
    img: string
    url: string
    title: string
    tags: string[]
}

export const ProjectCard = ({
    url,
    title,
    tags
}: IDropdown) => {
    return <div className={cx("flex column", css.projectCard)} >
        {/* <div>{img}</div> */}
        <a href={url}>{url}</a>
        <div>{title}</div>
        {tags.map((tag, i) => {
            return <div key={i}>{tag}</div>
        })}
    </div>

}

export default ProjectCard

"use strict";

const profile = {
    name: "Syed Bilal Majid",
    role: "Software Engineer",
    experience: "Intern at Bloomrix",
    contact: {
        email: "bilal@gmail.com",
        location: "Karachi, Pakistan"
    },
    education: [
        "Bachelor of Software Engineering - MUET",
    ],
    skills: [
        { name: "HTML", score: 90 },
        { name: "CSS", score: 85 },
        { name: "JavaScript", score: 65 },
        { name: "React", score: 60 },
        { name: "Git", score: 75 }
    ],
    projects: [
        "MUET GPA Calculator",
        "Food Ordering Website",
        "FootballLens - Machine Learning Project"
    ]
};

const profileCopy = { ...profile };

let profileData;

try {
    profileData = JSON.parse(
        localStorage.getItem("profileData") || JSON.stringify(profileCopy)
    );
} catch (error) {
    profileData = profileCopy;
    document.getElementById("message").textContent =
        "Unable to load saved data. Default profile is displayed.";
}

function displayProfile(data) {
    const { name, role, experience, contact, education } = data;

    document.getElementById("name").textContent = name;
    document.getElementById("role").textContent = role;
    document.getElementById("experience").textContent = experience;
    document.getElementById("contact").textContent =
        `${contact.email} | ${contact.location}`;

    document.getElementById("education").textContent =
        education.join(" | ");
}

function displaySkills(skills) {
    const skillList = document.getElementById("skills");

    const skillHTML = skills.map(skill =>
        `<li>${skill.name} - ${skill.score}%</li>`
    );

    skillList.innerHTML = skillHTML.join("");
    document.getElementById("skillCount").textContent =
        `Total skills: ${skills.length}`;
}

function filterSkills(searchText) {
    const filteredSkills = profileData.skills.filter(skill =>
        skill.name.toLowerCase().includes(searchText.toLowerCase())
    );

    displaySkills(filteredSkills);
}

function calculateScore(skills) {
    if (skills.length === 0) {
        return 0;
    }

    const total = skills.reduce((sum, skill) =>
        sum + skill.score, 0
    );

    return Math.round(total / skills.length);
}

function displayProjects(projects) {
    const projectList = document.getElementById("projects");

    projectList.innerHTML = projects.map(project =>
        `<li>${project}</li>`
    ).join("");
}

function checkSkill(skillName) {
    const message = document.getElementById("message");

    if (!skillName.trim()) {
        message.textContent = "Please enter a skill name.";
        return;
    }

    const skill = profileData.skills.find(item =>
        item.name.toLowerCase() === skillName.trim().toLowerCase()
    );

    if (skill) {
        message.textContent =
            `Yes! ${skill.name} is in my skill list with a score of ${skill.score}%.`;
    } else {
        message.textContent =
            "This skill is not currently in my profile.";
    }
}

function getScoreMessage(score) {
    if (score >= 80) {
        return "Strong skill profile!";
    } else if (score >= 60) {
        return "Good progress. Keep improving!";
    } else {
        return "More practice is needed.";
    }
}

const { skills, projects } = profileData;
const updatedSkills = [...skills];

const averageScore = calculateScore(updatedSkills);

document.getElementById("score").textContent =
    `Average skill score: ${averageScore}% - ${getScoreMessage(averageScore)}`;

displayProfile(profileData);
displaySkills(profileData.skills);
displayProjects(projects);

document.getElementById("skillSearch").addEventListener("input", event => {
    filterSkills(event.target.value);
});

document.getElementById("checkButton").addEventListener("click", () => {
    const input = document.getElementById("userInput").value;
    checkSkill(input);
});

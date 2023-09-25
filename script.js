const profile_pic = document.querySelector("main img");
const name = document.querySelector("main #name");
const unorder_list = document.querySelector("section div ul");

const userApiLink = `https://api.github.com/users/Mukesh-SE`;
const user = {};

function githubUser(url) {
	return new Promise(async (resolve, reject) => {
		try {
			const request = await fetch(url);
			if (request.status === 200) {
				const userData = await request.json();

				user["name"] = userData.name;
				user["avatar"] = userData.avatar_url;
				user["repos"] = await fetchRepos(userData.repos_url);

				// testing
				console.log(userData);

				resolve(user);
			} else {
				throw "failed to fetch api...";
			}
		} catch (err) {
			reject(err);
		}
	});
}

// Fetch Repositories
async function fetchRepos(reposUrls) {
	try {
		const response = await fetch(reposUrls);
		if (response.status === 200) {
			return await response.json();
		} else {
			throw "can not fetch repose url data....";
		}
	} catch (error) {
		console.log(error);
	}
}

// Fetch GitHub API.....
githubUser(userApiLink)
	.then((data) => {
		// HTML ---->
		name.textContent = data.name;
		profile_pic.src = data.avatar;

		projects(data.repos);
		// console.log(data.repos[0]);
	})
	.catch((error) => {
		console.log(error);
	});

// assigning the projects to Section > main > ul

function projects(projects_list) {
	projects_list.forEach((proj) => {
		// create list element li
		const listElement = document.createElement("li");
		const languagesList = document.createElement("li");
		const link = document.createElement("a");

		let langauges = [];
		async function fetchRepoLanguages() {
			try {
				const response = await fetch(`${proj.languages_url}`);
				if (response.status === 200) {
					const data = await response.json();
					Object.keys(data).forEach((lang) => {
						langauges.push(lang);
					});

					langauges.forEach((lang) => {
						const li_lang = document.createElement("li");
						// add class
						li_lang.classList.add("langs");

						switch (lang) {
							case "HTML":
								li_lang.classList.add("html");
								break;
							case "CSS":
								li_lang.classList.add("html");
								break;
							case "JavaScript":
								li_lang.classList.add("js");
								break;
							case "TypeScript":
								li_lang.classList.add("ts");
								break;
							case "Python":
								li_lang.classList.add("py");
								break;
							default:
								li_lang.classList.add("und")
						}
						li_lang.textContent = lang;
						listElement.appendChild(li_lang);
					});
				} else {
					throw "can not fetch repose url language data....";
				}
			} catch (error) {
				console.log(error);
			}
		}

		fetchRepoLanguages();

		listElement.classList.add("project");

		link.textContent = proj.name;
		link.href = proj.html_url;

		listElement.appendChild(link);
		unorder_list.appendChild(listElement);
	});
	// console.log(projects_list[0]);
}

// fetch Repositories Languages

async function fetchReposLang(reposUrl) {
	try {
		const response = await fetch(`${reposUrl}`);
		if (response.status === 200) {
			const data = await response.json();

			const language = Object.keys(data);
		} else {
			throw "can not fetch repose url language data....";
		}
	} catch (error) {
		console.log(error);
	}
}

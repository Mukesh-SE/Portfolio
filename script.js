const userApiLink = `https://api.github.com/users/Mukesh-SE`;
const reposUrl = `${userApiLink}/repos`;

const btn = document.getElementById("more-btn");
const parent_ul = document.querySelector("section ul");

async function repoDetail(repo) {
	try {
		let repo_li = document.createElement("li");
		const repo_name = document.createElement("h2");
		const repo_link = document.createElement('a')
		const lang_data = await fetch(repo.languages_url);
		const languages_Obj = await lang_data.json();

		repo_name.classList.add("repo_name");
		// array languages
		const languages_name = Object.keys(languages_Obj);

		// for perectage ...
		let lang_values = 0;
		languages_name.forEach((lang) => {
			lang_values += languages_Obj[lang];
		});

		repo_link.href = repo.html_url
		repo_link.textContent = repo.name

		repo_name.appendChild(repo_link);
		repo_li.appendChild(repo_name);

		// give precentage of each languages used in repos
		language_percentage(languages_Obj, languages_name, lang_values, repo_li);

		parent_ul.appendChild(repo_li);
	} catch (err) {
		console.log(err);
	}
}

// ----------------------
let load = 3;

const fetchRepos = async (url) => {
	try {
		const response = await fetch(url);
		if (response.status === 200) {
			const repos = await response.json();

			if (load === 3) {
				repos.splice(0, load).forEach((repo, index) => {
					repoDetail(repo);
				});
			}

			// for load more
			btn.addEventListener("click", async () => {
				repos.splice(0, load).forEach((repo, index) => {
					repoDetail(repo);
					load += 3;
					// hide after loading all repos..
				});
			});
		}
	} catch (err) {
		console.log(err);
	}
};

fetchRepos(reposUrl);

// --------------------------
// fetch repo's languages
function language_percentage(
	languages_Object,
	languages,
	total_lang_value,
	repo_lang_list
) {
	let lang_ul = document.createElement("ul");
	lang_ul.classList.add("languages");
	languages.forEach((lang) => {
		let languages_list = document.createElement("li");
		let lang_name = document.createElement("span");
		lang_name.classList.add("lang");

		let lang_percnt = document.createElement("span");
		lang_percnt.classList.add("percnt");
		let lang_percentage =
			Math.round((languages_Object[lang] * 100) / total_lang_value) + "%";

		// console.log(lang, lang_percentage + "%");

		lang_name.textContent = lang;
		lang_percnt.textContent = lang_percentage;

		languages_list.appendChild(lang_name);
		languages_list.appendChild(lang_percnt);
		lang_ul.appendChild(languages_list);
		repo_lang_list.appendChild(lang_ul);
	});
}

// let arr = [1, 2, 3, 4, 5, 6, 7];
// arr((num) => console.log(num));

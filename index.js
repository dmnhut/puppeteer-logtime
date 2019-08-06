const puppeteer = require('puppeteer');

const uname = '';
const pwd = '';
const project = '/projects/dc_general?jump=my';

(async () => {
	const browser = await puppeteer.launch({
		headless: false
	});

	const page = await browser.newPage();
	page.setViewport({
		width: 1366,
		height: 768
	});

	await page.goto('http://192.168.0.16:85/login');
	await page.type('#username', uname);
	await page.type('#password', pwd);
	await page.click('[name="login"]');

	await page.waitFor('#project_quick_jump_box');
	await page.select('#project_quick_jump_box', project);
	await page.$eval('#project_quick_jump_box', el => el.onchange());

	await page.waitFor('[href="/projects/dc_general/time_entries/new"]');
	await page.$eval('[href="/projects/dc_general/time_entries/new"]', el => el.click());

	await page.waitFor('#time_entry_issue_id');
	await page.waitFor('#time_entry_spent_on');
	await page.waitFor('#time_entry_hours');
	await page.waitFor('#time_entry_activity_id');
	await page.waitFor('#new_time_entry');
	await page.type('#time_entry_issue_id', "12541");
	await page.$eval('#time_entry_spent_on',
		el => el.setAttribute('value', [
			(new Date()).getFullYear(),
			('0' + ((new Date()).getMonth() + 1)).slice(-2),
			('0' + (new Date()).getDate()).slice(-2)
		].join('-')));
	await page.type('#time_entry_hours', "8");
	await page.select('#time_entry_activity_id', "33");
	await page.$eval('#new_time_entry', el => el.submit());

	await browser.close();
})();
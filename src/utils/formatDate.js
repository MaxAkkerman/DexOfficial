import dayjs from "dayjs";

/**
 * Return date in form of "15 September 2021 17:09"
 *
 * @param {number} timestamp
 * @returns {string}
 */
export default function formatDate(timestamp) {
	return dayjs(timestamp).format("DD MMMM YYYY HH:MM");
}

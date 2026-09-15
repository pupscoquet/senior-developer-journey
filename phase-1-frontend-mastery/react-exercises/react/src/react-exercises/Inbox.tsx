import { useState } from "react";

type Email = {
	id: number;
	sender: string;
	subject: string;
	time: string;
	read: boolean;
};

const emails: Email[] = [
	{
		id: 1,
		sender: "Victoria",
		subject: "What time is it?",
		time: "21:36",
		read: true
	},
	{
		id: 2,
		sender: "Kate",
		subject: "Time to go to bed",
		time: "21:45",
		read: false
	},
	{
		id: 3,
		sender: "Dad",
		subject: "Turn off the light",
		time: "22:10",
		read: false
	},
	{
		id: 4,
		sender: "Mum",
		subject: "I can still see your light on",
		time: "22:22",
		read: false
	},
];

function EmailRow(
	{ e, readState, handleClick }: { e: Email, readState: boolean, handleClick: () => void }
) {
	return (
		<div className="flex min-w-full flex-1 items-center border-b px-2 h-10 gap-2 cursor-default" onClick={handleClick}>
			{!readState && <span className="size-2 bg-blue-400 rounded-full mr-2"></span>}
			{readState && <span className="size-2 bg-transparent rounded-full mr-2"></span>}
			<span className="font-bold min-w-30 text-left">{e.sender}</span>
			<span className="text-left grow">{e.subject}</span>
			<span className="">{e.time}</span>
		</div>
	)

}

function Inbox({ unreadOnly }: { unreadOnly: boolean }) {
	const filteredEmails: React.JSX.Element[] = [];

	emails.forEach((e) => {
		let [readState, setReadState] = useState(e.read)

		function handleClick() {
			setReadState(readState = true);
			e.read = true;
		}

		if (e.read && unreadOnly) {
			return;
		} else {
			filteredEmails.push(<EmailRow e={{ ...e }} key={e.id} readState={readState} handleClick={handleClick} />);
		}
	})

	return (
		<div className={filteredEmails.length ? "border-t" : ""}>
			{filteredEmails.length ? (filteredEmails) : <div className="pt-10">No emails left to read.</div>}
		</div>
	)
}

export default function InboxContainer() {

	let [unreadOnly, setUnreadOnly] = useState(false);

	function handleCheck() {
		setUnreadOnly(unreadOnly = !unreadOnly)
	}

	return (
		<>
			<form className="text-right mr-2 mb-2">
				<label>
					<input
						type="checkbox"
						className="mr-2"
						checked={unreadOnly}
						onChange={handleCheck} />

					Only unread
				</label>
			</form>
			<Inbox unreadOnly={unreadOnly} />
		</>
	);
}

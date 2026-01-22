<script lang="ts">
	import { text } from "@sveltejs/kit";
	import { onMount, tick } from "svelte";

	type Message = {
		message: string;
		user: string;
	};

	const bc = new BroadcastChannel("test");

	const messages = $state<Message[]>([]);
	let messageInput = $state("");
	let tempUser = $state("");
	let user = $state("");

	function sendMessages(message: string, user: string): Message[] {
		const messageToSend: Message = { message, user };
		bc.postMessage(messageToSend);
		messages.push(messageToSend);
		messageInput = "";
		return messages;
	}

	function setUser() {
		user = tempUser;
		tempUser = "";
		localStorage.setItem("user", user);
	}

	onMount(() => {
		bc.onmessage = (e) => {
			messages.push(e.data as Message);
		};

		return () => {
			bc.close();
		};
	});

	let listEl: HTMLUListElement | undefined = $state();
	let itemsEl: HTMLLIElement[] = $state([]);

	$effect(() => {
		if (messages.length) {
			tick().then(() => {
				if (listEl) {
					listEl.scrollTop = listEl.scrollHeight;
				}
			});
		}
	});
</script>

<div
	class="min-h-screen bg-linear-to-t from-sky-500 to-purple-500 flex flex-col items-center justify-center *:max-w-[80vw] *:w-full"
>
	{#if !user}
		<span class="mb-2 flex mx-auto w-full text-white text-4xl"
			><span class="-rotate-25 inline font-bold mt-0.5 mr-0.5">e</span>
			<span class="font-bold font-header"> cho </span>
			<span class="font-bold font-header text-white/80">o</span>
			<span class="font-bold font-header text-white/60">o</span>
			<span class="font-bold font-header text-white/40">o</span>
			<span class="font-bold font-header text-white/20">o</span>
			<span class="font-bold font-header text-white/10">o</span>
		</span>
		<div class="flex gap-2 *:rounded-xl">
			<input
				placeholder="Choose a username"
				bind:value={tempUser}
				class="flex flex-1 bg-white w-full py-1 px-4"
				onkeyup={(e) => {
					if (e.key === "Enter") setUser();
				}}
			/>
			<button
				onclick={() => setUser()}
				class="bg-sky-100 font-semibold text-sm py-1 px-3">Join chat</button
			>
		</div>
	{:else}
		<div>
			<div
				class="border-b border-white text-white flex justify-between items-center mb-2 pb-1"
			>
				<span class="flex text-white text-xl"
					><span class="-rotate-25 inline font-bold mt-0.4 mr-0.5">e</span>
					<span class="font-bold font-header"> cho </span>
					<span class="font-bold font-header text-white/80">o</span>
					<span class="font-bold font-header text-white/60">o</span>
					<span class="font-bold font-header text-white/40">o</span>
					<span class="font-bold font-header text-white/20">o</span>
					<span class="font-bold font-header text-white/10">o</span>
				</span>
				<p class="w-fit text-sm">
					Logged in as <span class="font-bold">{user}</span>
				</p>
			</div>
			<div
				class="bg-linear-to-t from-white/45 to-white/0 flex-1 max-w-[80vw] p-4 max-w-200 mx-auto max-h-[80vh] h-[80vh]
				rounded-sm flex flex-col justify-between"
			>
				<ul
					class="flex-1 flex flex-col mb-2 gap-1 overflow-y-auto
					[mask-image:linear-gradient(to_top,black_75%,transparent)]
					[-webkit-mask-image:linear-gradient(to_top,black_75%,transparent)]"
					bind:this={listEl}
				>
					<li class="mt-auto"></li>
					{#each messages as m, i}
						{@const prev = messages[i - 1]}
						{@const next = messages[i + 1]}
						{@const firstInGroup = i === 0 || prev.user !== m.user}
						{@const lastInGroup = i === messages.length - 1 || next.user !== m.user}

						{@const myCorners = (() => {
							if (firstInGroup && lastInGroup) return 'rounded-md'
							if (firstInGroup) return 'rounded-md rounded-br-none'
							if (lastInGroup) return 'rounded-md rounded-tr-none'
							return 'rounded-l-md rounded-r-none'
						})}

						{@const theirCorners = (() => {
							if (firstInGroup && lastInGroup) return 'rounded-md'
							if (firstInGroup) return 'rounded-md rounded-bl-none'
							if (lastInGroup) return 'rounded-md rounded-tl-none'
							return 'rounded-l-none rounded-r-md'
						})}
						<li
							class="relative py-1 px-2 rounded-sm text-sm w-fit max-w-[80%] {m.user ===
							user
								? `text-right place-self-end bg-sky-100 ${myCorners()}`
								: `text-left place-self-start bg-purple-100 ${theirCorners()}`}"
						>
							{m.message}
						</li>
					{/each}
				</ul>

				<div class="flex gap-2 *:rounded-lg">
					<input
						bind:value={messageInput}
						autocomplete="off"
						autofocus={true}
						class="flex flex-1 bg-white py-1 px-4"
						onkeyup={(e) => {
							if (e.key === "Enter") sendMessages(messageInput, user);
						}}
					/>
					<button
						onclick={() => sendMessages(messageInput, user)}
						class="bg-sky-100 py-1 text-sm font-semibold px-2"
						>Send</button
					>
				</div>
			</div>
		</div>
	{/if}
</div>

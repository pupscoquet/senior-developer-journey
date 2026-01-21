<script lang="ts">
	import { text } from "@sveltejs/kit";
	import { onMount } from "svelte";

	type Message = {
		message: string;
		user: string;
	};

	const bc = new BroadcastChannel("test");

	const messages = $state<Message[]>([]);
	let messageInput = $state("");
	let tempUser = $state("");
	let user = $state("");

	const COLOURS = [""];

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
</script>

<div
	class="min-h-screen bg-[#decdf5] flex flex-col items-center justify-center *:max-w-[80vw] *:w-full"
>
	{#if !user}
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
				class="bg-[#656176] text-white font-semibold text-sm py-1 px-3"
				>Join chat</button
			>
		</div>
	{:else}
		<div>
			<div
				class="flex justify-between items-center px-4 rounded-xl bg-[#f8f1ff] mb-2"
			>
				<h1 class="font-bold text-xl">Chat</h1>
				<p class=" text-sm">
					Logged in as <span class="font-bold">{user}</span>
				</p>
			</div>
			<div
				class="bg-[#f8f1ff] flex-1 max-w-[80vw] p-4 max-w-200 mx-auto max-h-[80vh] h-[80vh]
				rounded-sm flex flex-col justify-between"
			>
				<ul class="flex-1 overflow-y-auto mb-2">
					{#each messages as m, i}
						{@const showArrow =
							i === 0 || messages[i - 1].user !== m.user}
						<li
							class="py-1 px-3 rounded-full text-sm mb-2 text-white w-fit max-w-[80%] {m.user ===
							user
								? 'text-right place-self-end bg-[#1b998b]'
								: 'text-left place-self-start bg-[#656176]'}"
						>
							<!-- {#if showArrow}
								<div class="w-4 overflow-hidden inline-block">
									<div
										class="h-6 rotate-45 transform origin-top-right"
									></div>
								</div>
							{/if} -->
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
						class="bg-[#534d56] py-1 text-white text-sm font-semibold px-2"
						>Send</button
					>
				</div>
			</div>
		</div>
	{/if}
</div>

<!-- /* HTML: <div class="triangle"></div> */
.triangle {
  width: 150px;
  aspect-ratio: 1;
  clip-path: polygon(0 0,100% 0,0 100%);
  background: linear-gradient(45deg,#FA6900,#C02942);
} -->

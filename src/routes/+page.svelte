<script>
	import { onMount } from 'svelte';
	
	let messages = [
		{
			id: '1',
			role: 'assistant',
			content: '👋 Witaj w Open WebUI Demo! To jest wersja demonstracyjna bez backendu. Wszystkie funkcje działają lokalnie w przeglądarce.',
			timestamp: new Date().toISOString()
		}
	];
	
	let newMessage = '';
	let isLoading = false;
	
	const demoResponses = [
		'To jest przykładowa odpowiedź z trybu demonstracyjnego Open WebUI.',
		'Świetne pytanie! W pełnej wersji tutaj znajdziesz odpowiedź prawdziwego modelu AI.',
		'Dziękuję za wiadomość. To demo pokazuje interfejs Open WebUI działający bez backendu.',
		'Interesujące! W normalnej wersji mógłbym pomóc Ci z tym zadaniem używając prawdziwego AI.',
		'W trybie demonstracyjnym mogę pokazać tylko przykładowe odpowiedzi. Pełna wersja oferuje znacznie więcej możliwości!'
	];
	
	async function sendMessage() {
		if (!newMessage.trim() || isLoading) return;
		
		const userMessage = {
			id: Date.now().toString() + '_user',
			role: 'user', 
			content: newMessage,
			timestamp: new Date().toISOString()
		};
		
		messages = [...messages, userMessage];
		const currentMessage = newMessage;
		newMessage = '';
		isLoading = true;
		
		// Symuluj opóźnienie odpowiedzi
		setTimeout(() => {
			const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];
			const aiMessage = {
				id: Date.now().toString() + '_ai',
				role: 'assistant',
				content: randomResponse,
				timestamp: new Date().toISOString()
			};
			messages = [...messages, aiMessage];
			isLoading = false;
		}, 1500 + Math.random() * 1000);
	}
	
	function handleKeydown(event) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			sendMessage();
		}
	}
</script>

<svelte:head>
	<title>Open WebUI Demo</title>
	<meta name="description" content="Open WebUI Demo - wersja demonstracyjna bez backendu" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Header -->
	<header class="bg-white shadow-sm border-b">
		<div class="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
			<div class="flex items-center space-x-3">
				<div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
					<span class="text-white font-bold text-lg">O</span>
				</div>
				<h1 class="text-xl font-semibold text-gray-900">Open WebUI Demo</h1>
			</div>
			<div class="text-sm text-gray-500 bg-yellow-100 px-3 py-1 rounded-full">
				🚧 Tryb demonstracyjny
			</div>
		</div>
	</header>

	<!-- Main Chat Area -->
	<main class="max-w-4xl mx-auto px-4 py-6">
		<div class="bg-white rounded-lg shadow-sm border min-h-[600px] flex flex-col">
			
			<!-- Messages Area -->
			<div class="flex-1 p-6 space-y-4 overflow-y-auto">
				{#each messages as message}
					<div class="flex {message.role === 'user' ? 'justify-end' : 'justify-start'}">
						<div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg {
							message.role === 'user' 
								? 'bg-blue-600 text-white' 
								: 'bg-gray-100 text-gray-900'
						}">
							<p class="text-sm">{message.content}</p>
							<div class="text-xs opacity-70 mt-1">
								{new Date(message.timestamp).toLocaleTimeString('pl-PL')}
							</div>
						</div>
					</div>
				{/each}
				
				{#if isLoading}
					<div class="flex justify-start">
						<div class="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
							<div class="flex space-x-1">
								<div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
								<div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
								<div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
							</div>
						</div>
					</div>
				{/if}
			</div>

			<!-- Input Area -->
			<div class="border-t p-4">
				<div class="flex space-x-2">
					<textarea
						bind:value={newMessage}
						on:keydown={handleKeydown}
						placeholder="Napisz wiadomość..."
						class="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						rows="3"
						disabled={isLoading}
					></textarea>
					<button
						on:click={sendMessage}
						disabled={!newMessage.trim() || isLoading}
						class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						{isLoading ? '...' : 'Wyślij'}
					</button>
				</div>
			</div>
		</div>

		<!-- Demo Info -->
		<div class="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
			<div class="flex">
				<div class="flex-shrink-0">
					<span class="text-yellow-600">ℹ️</span>
				</div>
				<div class="ml-3">
					<h3 class="text-sm font-medium text-yellow-800">Informacja o trybie demonstracyjnym</h3>
					<div class="mt-2 text-sm text-yellow-700">
						<ul class="list-disc list-inside space-y-1">
							<li>To jest wersja demonstracyjna Open WebUI działająca całkowicie w przeglądarce</li>
							<li>Nie wymaga backendu ani połączenia z prawdziwymi modelami AI</li>
							<li>Wszystkie odpowiedzi są przykładowe i generowane lokalnie</li>
							<li>Interfejs pokazuje główne funkcje aplikacji Open WebUI</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>

<style>
	@keyframes bounce {
		0%, 80%, 100% {
			transform: translateY(0);
		}
		40% {
			transform: translateY(-10px);
		}
	}
	
	.animate-bounce {
		animation: bounce 1.4s infinite;
	}
</style>
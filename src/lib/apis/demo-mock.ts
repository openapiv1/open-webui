// Mock API dla trybu demonstracyjnego Open WebUI
// Wszystkie API calls będą zwracać przykładowe dane zamiast wywoływać backend

// Przykładowe dane demonstracyjne
const DEMO_MODELS = [
	{
		id: 'demo-model-1',
		name: 'Demo GPT-4 Model',
		description: 'Przykładowy model AI dla demonstracji',
		version: '1.0.0',
		size: '7B',
		modified: new Date().toISOString()
	},
	{
		id: 'demo-model-2', 
		name: 'Demo Claude Model',
		description: 'Inny przykładowy model AI',
		version: '1.0.0',
		size: '13B',
		modified: new Date().toISOString()
	}
];

const DEMO_CHATS = [
	{
		id: 'demo-chat-1',
		title: 'Przykładowa rozmowa',
		created_at: new Date(Date.now() - 86400000).toISOString(), // wczoraj
		updated_at: new Date(Date.now() - 86400000).toISOString(),
		messages: [
			{
				id: 'msg-1',
				role: 'user',
				content: 'Cześć! Jak działasz?',
				timestamp: new Date(Date.now() - 86400000).toISOString()
			},
			{
				id: 'msg-2',
				role: 'assistant',
				content: 'Witam! To jest wersja demonstracyjna Open WebUI. Obecnie działam w trybie offline bez połączenia z prawdziwymi modelami AI. Wszystkie odpowiedzi są przykładowe.',
				timestamp: new Date(Date.now() - 86400000 + 5000).toISOString()
			}
		]
	}
];

const DEMO_CONFIG = {
	version: '0.6.26-demo',
	name: 'Open WebUI Demo',
	default_locale: 'pl',
	trusted_header_auth: false,
	oauth_enabled: false,
	signup_enabled: false,
	default_models: ['demo-model-1'],
	features: {
		enable_signup: false,
		enable_login: false,  
		enable_web_search: false,
		enable_image_generation: false
	}
};

// Funkcje pomocnicze dla mock API
export const mockFetch = (url: string, options?: RequestInit): Promise<Response> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			let mockData: any = { error: 'Not implemented in demo' };
			
			// Symulacja różnych endpointów
			if (url.includes('/models')) {
				mockData = DEMO_MODELS;
			} else if (url.includes('/chats')) {
				if (options?.method === 'POST') {
					mockData = { id: 'demo-chat-' + Date.now(), ...DEMO_CHATS[0] };
				} else {
					mockData = DEMO_CHATS;
				}
			} else if (url.includes('/config')) {
				mockData = DEMO_CONFIG;
			} else if (url.includes('/generate')) {
				mockData = {
					response: 'To jest przykładowa odpowiedź z trybu demonstracyjnego. W pełnej wersji tutaj byłaby odpowiedź prawdziwego modelu AI.',
					done: true
				};
			}

			const response = new Response(JSON.stringify(mockData), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			});
			
			resolve(response);
		}, Math.random() * 500 + 100); // Symulacja opóźnienia sieci 100-600ms
	});
};

// Eksportuj mock dane dla innych komponentów
export { DEMO_MODELS, DEMO_CHATS, DEMO_CONFIG };
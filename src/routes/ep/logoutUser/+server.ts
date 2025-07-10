export async function GET({ cookies }) {
	// Clear the token cookie to log out the user
	cookies.delete("token", { path: "/" });
	// Return a response indicating successful logout
	return new Response(JSON.stringify({ message: "User logged out successfully" }), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}

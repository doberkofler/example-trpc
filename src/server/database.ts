export class Database {
	private users: string[] = ['Jon', 'Jane'];

	public get(): string[] {
		return this.users;
	}

	public add(name: string): void {
		this.users.push(name);
	}
}

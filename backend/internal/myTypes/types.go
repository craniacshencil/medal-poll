package myTypes

type User struct {
	Username string
	Password string
}

type Option struct {
	Key   int
	Value string
}

type PollData struct {
	Choices []Option
	Medals  []Option
}

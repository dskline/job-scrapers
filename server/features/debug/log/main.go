package log

import (
	"fmt"
	"log/slog"
)

func Debug(msg string, args ...any) {
	slog.Debug(fmt.Sprintf(msg, args...))
}

func Info(msg string, args ...any) {
	slog.Info(fmt.Sprintf(msg, args...))
}

func Error(msg string, args ...any) {
	slog.Error(fmt.Sprintf(msg, args...))
}

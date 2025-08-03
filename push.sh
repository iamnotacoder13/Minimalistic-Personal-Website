#!/bin/bash

# Simple script to push changes to GitHub
echo "🚀 Pushing changes to GitHub..."

# Add all changes
git add .

# Get commit message from user
echo "Enter a commit message (or press Enter for default):"
read commit_message

# Use default if no message provided
if [ -z "$commit_message" ]; then
    commit_message="Update website"
fi

# Commit changes
git commit -m "$commit_message"

# Push to GitHub
git push

echo "✅ Successfully pushed to GitHub!"
echo "🌐 View your site at: https://iamnotacoder13.github.io/Minimalistic-Personal-Website" 
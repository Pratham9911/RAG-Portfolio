#  RAG Portfolio — AI That Represents Me

> What if visitors could talk to my portfolio instead of just reading it?

An **AI-powered personal portfolio website** where a chatbot answers questions about me — my education, interests, projects, and work — **the way I would**.
<p align="center">
  🔗 <strong>Live Website:</strong><br>
  <a href="https://pratham-tiwari.vercel.app" target="_blank">
    https://pratham-tiwari.vercel.app
  </a>
</p>

<p align="center">
  <img src="rag-portfolio/public/assets//ragportfolio/Dashboard.png "  width="100%">
</p>

---

## 🌟 Why This Project Exists

Most portfolios are static.  
This one is **conversational**.

Instead of scrolling through pages, visitors can simply ask:

- What do you love working on?
- Where do you study?
- What projects have you built?
- Explain your work like I’m a recruiter.

And the AI responds **accurately, honestly, and in the right tone**.

---

## 🏗️ System Flow

<p align="center">
  <img src="rag-portfolio/public/assets/ragportfolio/RAGarchitecture.jpg " alt="Intent-Driven RAG Architecture" width="50%">
</p>

---
How It Works

This is **not** a generic chatbot.

The system:
1. Understands the **intent** behind a question  
2. Retrieves the **relevant personal information**  
3. Generates a **natural language response** based on the selected mode  

If something is unclear or missing, it:
- Asks for clarification  
- Or says *“I don’t have this information”*

---

## 🎭 Conversation Modes

The chatbot adapts its responses based on the audience:

- **Casual** – Friendly and conversational  
- **Technical** – Detailed and implementation-focused  
- **Recruiter** – Clear, concise, and professional  

The same question can produce different answers — intentionally.

---

## 🧩 Key Features

- Intent-based retrieval (no blind searching)
- Multi-intent understanding in a single query
- Failure-aware responses (knows when not to answer)
- Clarification handling for ambiguous questions
- LLM-powered natural language understanding
- Controlled and truthful answers

---

## 🧠 Why Intent-Based Retrieval?

For a **personal portfolio**, the knowledge base is:
- Small
- Structured
- Accuracy-critical

Instead of semantic search over all text, this system:
- First understands *what* the user is asking
- Then retrieves *only* the relevant information

This reduces hallucinations and improves trust — a common design choice in production assistants.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js / React  
- **Backend:** LLM-powered intent classification , retrieval & response generation using python
- **Prompt Engineering:** Mode-controlled prompting  
- **Deployment:** Vercel  

---

## 🚀 Use Cases

- Interactive personal portfolio
- Recruiter-facing AI assistant
- Intent-driven conversational systems
- Controlled RAG-style applications

---

## 📌 Future Improvements

- Hybrid intent + semantic retrieval
- Confidence scoring for answers
- Source highlighting
- Conversation analytics

---


## ⭐ Final Note

This project focuses on **using the right design**, not just complex AI.

If you found this interesting, feel free to ⭐ the repository.



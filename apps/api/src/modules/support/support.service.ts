import { Injectable } from '@nestjs/common';

export interface Ticket {
  id: string;
  subject: string;
  category: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface FeedbackItem {
  id: string;
  title: string;
  category: string;
  description: string;
  upvotes: number;
  status: 'under_review' | 'planned' | 'in_progress' | 'completed';
  createdAt: string;
}

@Injectable()
export class SupportService {
  private tickets: Ticket[] = [
    {
      id: 't-1001',
      subject: 'Screen sharing resolution cap issue',
      category: 'Bug Report',
      description: 'Stream is locked at 720p even on 4K display setting.',
      status: 'in_progress',
      priority: 'medium',
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    },
    {
      id: 't-1002',
      subject: 'Question regarding custom group emoji import',
      category: 'Billing & Account',
      description: 'How do I enable 50 animated custom emojis for my group?',
      status: 'resolved',
      priority: 'low',
      createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    },
  ];

  private feedback: FeedbackItem[] = [
    {
      id: 'fb-201',
      title: 'Spotify & Apple Music Watch Party Integration',
      category: 'Integrations',
      description: 'Synchronized music playback inside 3D clubhouse audio zone.',
      upvotes: 142,
      status: 'in_progress',
      createdAt: new Date(Date.now() - 3600000 * 120).toISOString(),
    },
    {
      id: 'fb-202',
      title: 'Mobile Widget for Today’s Friend Birthdays',
      category: 'Mobile App',
      description: 'iOS Lock Screen and Android Home Screen widget showing upcoming birthdays.',
      upvotes: 98,
      status: 'planned',
      createdAt: new Date(Date.now() - 3600000 * 96).toISOString(),
    },
    {
      id: 'fb-203',
      title: 'Dark Mode Theme Customizer Palette',
      category: 'UI / Customization',
      description: 'Allow custom accent hex colors for glassmorphism panels.',
      upvotes: 74,
      status: 'completed',
      createdAt: new Date(Date.now() - 3600000 * 200).toISOString(),
    },
  ];

  async getTickets() {
    return this.tickets;
  }

  async createTicket(body: { subject: string; category: string; description: string; priority?: 'low' | 'medium' | 'high' }) {
    const newTicket: Ticket = {
      id: `t-${Date.now()}`,
      subject: body.subject,
      category: body.category,
      description: body.description,
      status: 'open',
      priority: body.priority || 'medium',
      createdAt: new Date().toISOString(),
    };
    this.tickets.unshift(newTicket);
    return newTicket;
  }

  async getFeedback() {
    return this.feedback;
  }

  async submitFeedback(body: { title: string; category: string; description: string }) {
    const newItem: FeedbackItem = {
      id: `fb-${Date.now()}`,
      title: body.title,
      category: body.category,
      description: body.description,
      upvotes: 1,
      status: 'under_review',
      createdAt: new Date().toISOString(),
    };
    this.feedback.unshift(newItem);
    return newItem;
  }

  async upvoteFeedback(id: string) {
    const item = this.feedback.find((f) => f.id === id);
    if (item) {
      item.upvotes += 1;
    }
    return item;
  }
}
